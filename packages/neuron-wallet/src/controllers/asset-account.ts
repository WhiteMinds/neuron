import AssetAccount from "models/asset-account"
import Transaction from "models/chain/transaction"
import AssetAccountService from "services/asset-account-service"
import { ServiceHasNoResponse } from "exceptions"
import { ResponseCode } from "utils/const"
import NetworksService from "services/networks"
import AddressGenerator from "models/address-generator"
import { AddressPrefix } from "@nervosnetwork/ckb-sdk-utils"
import AssetAccountInfo from "models/asset-account-info"
import TransactionSender from "services/transaction-sender"
import { BrowserWindow, dialog } from "electron"
import { t } from "i18next"
import WalletsService from "services/wallets"
import CommandSubject from 'models/subjects/command'
import SyncApiController, { SyncStatus } from "./sync-api"
import { TransactionGenerator } from "services/tx"

export interface GenerateCreateAssetAccountTxParams {
  walletID: string
  tokenID: string
  accountName: string
  tokenName: string
  symbol: string
  decimal: string
  feeRate: string
  fee: string
}

export interface SendCreateAssetAccountTxParams {
  walletID: string
  assetAccount: AssetAccount
  tx: Transaction
  password: string
}

export interface UpdateAssetAccountParams {
  id: number
  accountName?: string,
  tokenName?: string,
  symbol?: string
  decimal?: string
}

export interface MigrateACPParams {
  id: string
  password: string
}

export default class AssetAccountController {
  private displayedACPMigrationDialogByWalletIds: Set<string> = new Set()

  public async getAll(params: { walletID: string }): Promise<Controller.Response<(AssetAccount & { address: string })[]>> {
    const assetAccountInfo = new AssetAccountInfo()

    const assetAccounts = await AssetAccountService.getAll(params.walletID)

    if (!assetAccounts) {
      throw new ServiceHasNoResponse('AssetAccount')
    }

    const addressPrefix = NetworksService.getInstance().isMainnet() ? AddressPrefix.Mainnet : AddressPrefix.Testnet

    const result = assetAccounts.map(aa => {
      return {
        ...aa,
        address: AddressGenerator.generate(
          assetAccountInfo.generateAnyoneCanPayScript(aa.blake160),
          addressPrefix,
        )
      }
    })

    return {
      status: ResponseCode.Success,
      result,
    }
  }

  public async getAccount(params: { walletID: string, id: number }): Promise<Controller.Response<AssetAccount & { address: string }>> {
    const account = await AssetAccountService.getAccount(params)

    if (!account) {
      throw new ServiceHasNoResponse('AssetAccount')
    }

    const assetAccountInfo = new AssetAccountInfo()
    const addressPrefix = NetworksService.getInstance().isMainnet() ? AddressPrefix.Mainnet : AddressPrefix.Testnet

    return {
      status: ResponseCode.Success,
      result: {
        ...account,
        address: AddressGenerator.generate(
          assetAccountInfo.generateAnyoneCanPayScript(account.blake160),
          addressPrefix,
        )
      }
    }
  }

  public async generateCreateTx(params: GenerateCreateAssetAccountTxParams): Promise<Controller.Response<{
    assetAccount: AssetAccount,
    tx: Transaction
  }>> {
    const result = await AssetAccountService.generateCreateTx(
      params.walletID,
      params.tokenID,
      params.symbol,
      params.accountName,
      params.tokenName,
      params.decimal,
      params.feeRate,
      params.fee
    )

    if (!result) {
      throw new ServiceHasNoResponse('AssetAccount')
    }

    return {
      status: ResponseCode.Success,
      result,
    }
  }

  public async sendCreateTx(params: SendCreateAssetAccountTxParams): Promise<Controller.Response<string>> {
    const tx = Transaction.fromObject(params.tx)
    const assetAccount = AssetAccount.fromObject(params.assetAccount)
    const txHash = await AssetAccountService.sendTx(params.walletID, assetAccount, tx, params.password)

    if (!txHash) {
      throw new ServiceHasNoResponse('AssetAccount')
    }

    return {
      status: ResponseCode.Success,
      result: txHash,
    }
  }

  public async update(params: UpdateAssetAccountParams) {
    await AssetAccountService.update(params.id, params)

    return {
      status: ResponseCode.Success,
      result: undefined,
    }
  }

  public async getTokenInfoList() {
    const result = await AssetAccountService.getTokenInfoList()
    return {
      status: ResponseCode.Success,
      result,
    }
  }

  public async migrateAcp(params: MigrateACPParams): Promise<Controller.Response<string>> {
    const tx = await TransactionGenerator.generateMigrateLegacyACPTx(params.id)

    const txHash = await new TransactionSender().sendTx(params.id, tx!, params.password)

    return {
      status: ResponseCode.Success,
      result: txHash,
    }
  }

  public async showACPMigrationDialog() {
    const walletsService = WalletsService.getInstance()
    const currentWallet = walletsService.getCurrent()
    const walletId = currentWallet!.id;


    if (this.displayedACPMigrationDialogByWalletIds.has(walletId)) {
      return
    }

    const syncStatus = await new SyncApiController().getSyncStatus()
    if (syncStatus !== SyncStatus.SyncCompleted || BrowserWindow.getAllWindows().length !== 1) {
      return
    }

    const window = BrowserWindow.getFocusedWindow()!
    if (!window) {
      return
    }

    const tx = await TransactionGenerator.generateMigrateLegacyACPTx(walletId)
    if (!tx) {
      return
    }

    this.displayedACPMigrationDialogByWalletIds.add(walletId)

    const I18N_PATH = `messageBox.acp-migration`
    return dialog.showMessageBox({
      type: 'info',
      buttons: ['skip', 'migrate'].map(label => t(`${I18N_PATH}.buttons.${label}`)),
      defaultId: 1,
      title: t(`${I18N_PATH}.title`),
      message: t(`${I18N_PATH}.message`),
      detail: t(`${I18N_PATH}.detail`),
      cancelId: 0,
      noLink: true,
    }).then(({ response }) => {
      switch (response) {
        case 1: {
          CommandSubject.next({
            winID: window.id,
            type: 'migrate-acp',
            payload: walletId,
            dispatchToUI: true
          })
          return false
        }
        case 0:
        default:
      }
    })
  }
}
