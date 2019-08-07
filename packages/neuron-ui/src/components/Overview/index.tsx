import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Stack,
  Text,
  ActionButton,
  DefaultButton,
  DetailsList,
  DetailsRow,
  IColumn,
  CheckboxVisibility,
  DetailsListLayoutMode,
  IRenderFunction,
  IDetailsRowProps,
  IDetailsRowStyles,
  FontSizes,
  Callout,
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react'
import PropertyList, { Property } from 'widgets/PropertyList'

import { StateWithDispatch } from 'states/stateProvider/reducer'
import { updateTransactionList, addPopup } from 'states/stateProvider/actionCreators'

import { showErrorMessage } from 'services/remote'

import { localNumberFormatter, shannonToCKBFormatter, uniformTimeFormatter as timeFormatter } from 'utils/formatters'
import { PAGE_SIZE } from 'utils/const'

const TITLE_FONT_SIZE = 'xxLarge'

const ActivityList = ({
  columns,
  items,
  ...props
}: React.PropsWithoutRef<{
  columns: IColumn[]
  items: any
  isHeaderVisible?: boolean
  onRenderRow?: IRenderFunction<IDetailsRowProps>
  [index: string]: any
}>) => (
  <DetailsList
    layoutMode={DetailsListLayoutMode.fixedColumns}
    checkboxVisibility={CheckboxVisibility.hidden}
    compact
    items={items}
    columns={columns}
    styles={{
      root: {
        backgroundColor: 'transparent',
      },
      headerWrapper: {
        selectors: {
          '.ms-DetailsHeader': {
            backgroundColor: 'transparent',
          },
          '.ms-DetailsHeader-cellName': {
            fontSize: FontSizes.xLarge,
          },
        },
      },
      contentWrapper: {
        selectors: {
          '.ms-DetailsRow': {
            backgroundColor: 'transparent',
          },
          '.ms-DetailsRow-cell': {
            fontSize: FontSizes.mediumPlus,
          },
        },
      },
    }}
    {...props}
  />
)
const Overview = ({
  dispatch,
  app: { tipBlockNumber, chain, epoch, difficulty },
  wallet: { id, name, balance = '', addresses = [] },
  chain: {
    codeHash = '',
    transactions: { items = [] },
  },
}: React.PropsWithoutRef<StateWithDispatch & RouteComponentProps>) => {
  const [t] = useTranslation()
  const [displayBlockchainInfo, setDisplayBlockchainInfo] = useState(false)
  const [displayMinerInfo, setDisplayMinerInfo] = useState(false)

  const blockchainInfoRef = useRef<HTMLDivElement>(null)
  const minerInfoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateTransactionList({
      pageNo: 1,
      pageSize: PAGE_SIZE,
      keywords: '',
      walletID: id,
    })(dispatch)
  }, [id, dispatch])

  const onTransactionRowRender = useCallback((props?: IDetailsRowProps) => {
    if (props) {
      const customStyles: Partial<IDetailsRowStyles> = {
        root: {
          animationDuration: '0!important',
        },
      }
      if (props.item.status === 'failed') {
        customStyles.root = {
          animationDuration: '0!important',
          color: 'red',
        }
      }
      return <DetailsRow {...props} styles={customStyles} />
    }
    return null
  }, [])

  const onTransactionTypeRender = useCallback((item?: any) => {
    if (item) {
      return (
        <Text
          variant="mediumPlus"
          as="span"
          style={{
            color: item.type === 'receive' ? '#28b463' : '#e66465',
          }}
        >
          {item.type}
        </Text>
      )
    }
    return null
  }, [])

  const onTimestampRender = useCallback((item?: any) => {
    if (item) {
      return (
        <Text variant="mediumPlus" as="span">
          {timeFormatter(item.timestamp || item.createdAt)}
        </Text>
      )
    }
    return null
  }, [])

  const activityColumns: IColumn[] = useMemo(() => {
    return [
      {
        key: 'timestamp',
        name: t('overview.datetime'),
        minWidth: 180,
        maxWidth: 180,
        onRender: onTimestampRender,
      },
      {
        key: 'type',
        name: t('overview.type'),
        minWidth: 100,
        maxWidth: 100,
        onRender: onTransactionTypeRender,
      },
      {
        key: 'status',
        name: t('overview.status'),
        minWidth: 100,
        maxWidth: 100,
      },
      {
        key: 'value',
        name: t('overview.amount'),
        title: 'value',
        minWidth: 100,
        maxWidth: 500,
        onRender: (item?: State.Transaction) => {
          if (item) {
            return <span title={`${item.value} shannon`}>{`${shannonToCKBFormatter(item.value)} CKB`}</span>
          }
          return '-'
        },
      },
    ].map(
      (col): IColumn => ({
        fieldName: col.key,
        ariaLabel: col.name,
        ...col,
      })
    )
  }, [t, onTimestampRender, onTransactionTypeRender])

  const balanceProperties: Property[] = useMemo(
    () => [
      {
        label: t('overview.balance'),
        value: `${shannonToCKBFormatter(balance)} CKB`,
      },
    ],
    [t, balance]
  )
  const blockchainStatusProperties = useMemo(
    () => [
      {
        label: t('overview.chain-identity'),
        value: chain,
      },
      {
        label: t('overview.tip-block-number'),
        value: localNumberFormatter(tipBlockNumber),
      },
      {
        label: t('overview.epoch'),
        value: epoch,
      },
      {
        label: t('overview.difficulty'),
        value: localNumberFormatter(+difficulty),
      },
    ],
    [t, chain, epoch, difficulty, tipBlockNumber]
  )

  const showBlockchainStatus = useCallback(() => {
    setDisplayBlockchainInfo(true)
  }, [setDisplayBlockchainInfo])
  const hideBlockchainStatus = useCallback(() => {
    setDisplayBlockchainInfo(false)
  }, [setDisplayBlockchainInfo])
  const showMinerInfo = useCallback(() => {
    setDisplayMinerInfo(true)
  }, [setDisplayMinerInfo])
  const hideMinerInfo = useCallback(() => {
    setDisplayMinerInfo(false)
  }, [setDisplayMinerInfo])

  const defaultAddress = useMemo(() => {
    return addresses.find(addr => addr.type === 0 && addr.index === 0)
  }, [addresses])

  const onCopyPubkeyHash = useCallback(() => {
    if (defaultAddress) {
      window.navigator.clipboard.writeText(defaultAddress.identifier)
      hideMinerInfo()
      addPopup('lock-arg-copied')(dispatch)
    } else {
      showErrorMessage(t('messages.error'), t('messages.can-not-find-the-default-address'))
    }
  }, [defaultAddress, t, hideMinerInfo, dispatch])

  return (
    <Stack tokens={{ childrenGap: 15 }} verticalFill horizontalAlign="stretch">
      <Text as="h1" variant={TITLE_FONT_SIZE}>
        {name}
      </Text>
      <Stack horizontal horizontalAlign="space-between">
        <PropertyList properties={balanceProperties} />
        <Stack tokens={{ childrenGap: 15 }}>
          <div ref={blockchainInfoRef}>
            <DefaultButton onClick={showBlockchainStatus} styles={{ root: { width: '200px' } }}>
              {t('overview.blockchain-status')}
            </DefaultButton>
          </div>
          <div ref={minerInfoRef}>
            <DefaultButton onClick={showMinerInfo} styles={{ root: { width: '200px' } }}>
              {t('overview.miner-info')}
            </DefaultButton>
          </div>
        </Stack>
      </Stack>
      <Text as="h2" variant={TITLE_FONT_SIZE}>
        {t('overview.recent-activities')}
      </Text>
      {items.length ? (
        <ActivityList columns={activityColumns} items={items} onRenderRow={onTransactionRowRender} />
      ) : (
        <div>{t('overview.no-recent-activities')}</div>
      )}
      {blockchainInfoRef.current ? (
        <Callout
          target={blockchainInfoRef.current}
          hidden={!displayBlockchainInfo}
          onDismiss={hideBlockchainStatus}
          gapSpace={0}
        >
          <Stack tokens={{ padding: 15 }}>
            <PropertyList properties={blockchainStatusProperties} />
          </Stack>
        </Callout>
      ) : null}
      {minerInfoRef.current ? (
        <Callout target={minerInfoRef.current} hidden={!displayMinerInfo} onDismiss={hideMinerInfo} gapSpace={0}>
          <Stack tokens={{ padding: 15 }}>
            {defaultAddress ? (
              <Stack tokens={{ childrenGap: 15 }} styles={{ root: { padding: 5 } }}>
                <Stack tokens={{ childrenGap: 15 }}>
                  <Text variant="small" style={{ fontWeight: 600 }}>
                    {t('overview.address')}
                  </Text>
                  <Text variant="small" className="fixedWidth">
                    {defaultAddress.address}
                  </Text>
                </Stack>
                <Stack tokens={{ childrenGap: 15 }}>
                  <Text variant="small" style={{ fontWeight: 600 }}>
                    {t('overview.code-hash')}
                  </Text>
                  <Text variant="small" className="fixedWidth">
                    {codeHash}
                  </Text>
                </Stack>
                <Stack tokens={{ childrenGap: 15 }}>
                  <Text variant="small" style={{ fontWeight: 600 }}>
                    {t('overview.lock-arg')}
                  </Text>
                  <Text variant="small" className="fixedWidth">
                    {defaultAddress.identifier}
                  </Text>
                </Stack>
                <Stack horizontalAlign="end">
                  <ActionButton iconProps={{ iconName: 'MiniCopy' }} onClick={onCopyPubkeyHash}>
                    {t('overview.copy-pubkey-hash')}
                  </ActionButton>
                </Stack>
              </Stack>
            ) : (
              <MessageBar messageBarType={MessageBarType.error}>
                {t('messages.can-not-find-the-default-address')}
              </MessageBar>
            )}
          </Stack>
        </Callout>
      ) : null}
    </Stack>
  )
}

Overview.displayName = 'Overview'

export default Overview
