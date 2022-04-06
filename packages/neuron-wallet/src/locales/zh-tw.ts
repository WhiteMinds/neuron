export default {
  translation: {
    keywords: {
      wallet: '錢包',
      password: '密碼',
      'wallet-name': '錢包名稱'
    },
    'application-menu': {
      neuron: {
        about: '關於{{app}}',
        preferences: '偏好設定...',
        'check-updates': '檢查更新...',
        quit: '退出{{app}}'
      },
      wallet: {
        label: '錢包',
        select: '選擇錢包',
        'create-new': '創建新錢包',
        import: '導入錢包',
        backup: '備份當前錢包',
        'export-xpubkey': '導出 Extended Public Key',
        delete: '删除當前錢包',
        'change-password': '修改密碼',
        'import-mnemonic': '導入助記詞',
        'import-keystore': '導入 Keystore 檔案',
        'import-xpubkey': '導入 Extended Public Key',
        'import-hardware': '導入硬體錢包'
      },
      edit: {
        label: '編輯',
        cut: '剪下',
        copy: '複製',
        paste: '貼上',
        selectall: '全選'
      },
      tools: {
        label: '工具',
        'sign-and-verify': '簽名/驗簽信息',
        'multisig-address': '多簽地址',
        'offline-sign': '離線簽名',
        'clear-sync-data': '清除所有同步數據'
      },
      window: {
        label: '視窗',
        minimize: '最小化',
        close: '關閉視窗'
      },
      help: {
        label: '幫助',
        'nervos-website': 'Nervos 官方網站',
        'source-code': '原始程式碼',
        'report-issue': '回報問題',
        documentation: '使用說明',
        settings: '設定',
        'export-debug-info': '導出除錯信息'
      },
      develop: {
        develop: '開發',
        'force-reload': '強制重新載入',
        reload: '重新載入',
        'toggle-dev-tools': '開發者工具'
      }
    },
    services: {
      transactions: '交易',
      wallets: '錢包'
    },
    messages: {
      'failed-to-load-networks': '載入節點失敗。',
      'Networks-will-be-reset': '節點清單將被重置。',
      'wallet-password-less-than-min-length': '密碼應至少包含{{minPasswordLength}}字元。',
      'wallet-password-more-than-max-length': '密碼不能超過{{maxPasswordLength}}字元。',
      'wallet-password-letter-complexity': '密碼需至少包含大寫字母、小寫字母、數位、特殊符號其中三類。',
      'current-wallet-not-set': '未設定當前錢包。',
      'incorrect-password': '密碼不正確。',
      'invalid-address': '地址 {{address}} 無效。',
      'codehash-not-loaded': 'codehash 還未加載完成。',
      'wallet-not-found': '未找到錢包 {{id}}。',
      'failed-to-create-mnemonic': '創建助記詞失敗。',
      'network-not-found': '未找到 ID 為 {{id}} 的網絡設定。',
      'invalid-name': '{{field}} 名稱無效。',
      'default-network-unremovable': '默認網絡不可删除。',
      'lack-of-default-network': '缺少默認網絡。',
      'current-network-not-set': '當前 CKB 節點 RPC 地址未設定。',
      'transaction-not-found': '未找到交易 {{hash}}。',
      'is-required': '缺少 {{field}}。',
      'invalid-format': '{{field}} 格式錯誤。',
      'used-name': '{{field}} 名稱已存在，請輸入其它名稱。',
      'missing-required-argument': '缺少必要参数。',
      'save-keystore': '保存 Keystore 檔案。',
      'save-extended-public-key': '保存 Extended Public Key。',
      'import-extended-public-key': '導入 Extended Public Key。',
      'invalid-mnemonic': '助記詞無效，請檢查。',
      'unsupported-cipher': '不支持的 Cipher。',
      'capacity-not-enough': '餘額不足。',
      'capacity-not-enough-for-change': '您需要有足够的餘額來支付找零（大于 61 CKBytes）。',
      'capacity-not-enough-for-change-by-transfer':
        "您需要有足够的餘額來支付找零（大于 61 CKBytes），或者點擊 'Max' 按鈕發送全部餘額。",
      'live-capacity-not-enough': '可用餘額不足，請等待上一筆交易上鏈。',
      'capacity-too-small': '最小轉帳金額為 {{bytes}} CKBytes。',
      'should-be-type-of': '{{field}} 應該為 {{type}} 類型。',
      'invalid-keystore': 'Keystore 格式錯誤，請檢查檔案完整性。',
      'invalid-json': 'JSON 檔案格式錯誤，請檢查檔案完整性。',
      'cell-is-not-yet-live': '請耐心等待上一筆交易被區塊鏈確認。',
      'transaction-is-not-committed-yet': '無法在鏈上找到交易所需要的 cell，請確保相關的交易已經被區塊鏈確認。',
      'mainnet-address-required': '{{address}} 不是主網地址。',
      'testnet-address-required': '{{address}} 不是測試網地址。',
      'target-output-not-found': "There isn't an account wallet associated with this address.",
      'acp-same-account': "The payment account and receive account shouldn't be the same.",
      'device-sign-canceled': '您取消了簽名。否則，請確保設備上 Nervos app 設置開啟了 “allow contract data”。',
      'connect-device-failed': '設備無法連接，請檢查設備連接狀況。',
      'save-offline-json-failed': '無法保存 JSON 文件。',
      'offline-sign-failed': '簽名失敗，請檢查是否使用了正確的錢包進行簽名。',
      'multisig-script-prefix-error': '多簽配置錯誤',
      'multisig-config-not-exist': '多簽配置不存在',
      'multisig-config-exist': '多簽地址已經存在',
      'multisig-config-address-error': '多簽配置的地址設置不正確',
      'multisig-config-need-error': '多簽交易生成需要多簽配置',
      'transaction-no-input-paramter': '查詢 Input Cell 缺少必要的參數'
    },
    messageBox: {
      button: {
        confirm: '確定',
        discard: '放棄'
      },
      'send-capacity': {
        title: '發送交易'
      },
      'clear-sync-data': {
        title: '清除同步數據',
        message: '清除所有同步數據會重置所有本地節點數據並重新同步，整個過程可能會消耗較長時間。'
      },
      'remove-network': {
        title: '删除網路',
        message: '將删除網路 {{name}}(地址: {{address}})的設定.',
        alert: '這是當前連接網路，删除後會連接到默認網路'
      },
      'remove-wallet': {
        title: '删除錢包',
        password: '密碼'
      },
      'backup-keystore': {
        title: '備份 Keystore 檔案',
        password: '密碼'
      },
      transaction: {
        title: '交易: {{hash}}'
      },
      'sign-and-verify': {
        title: '簽名/驗簽信息'
      },
      'multisig-address': {
        title: '多簽地址'
      },
      'ckb-dependency': {
        title: '內置 CKB 節點',
        message: '缺少必要的依賴',
        detail:
          'Neuron 內置的 CKB 節點需要安裝 x64 版本的 Microsoft Visual C++ Redistributable 才能正常運行。您需要安裝該組件來啟動內置節點。',
        buttons: {
          'install-and-exit': '安裝並退出'
        }
      },
      'acp-migration': {
        title: '升級資產賬戶',
        message: '升級資產賬戶',
        detail:
          '我們的安全團隊在近期在實驗性的資產賬戶腳本中定位了壹個潛在的安全性問題。我們已經部署了新的資產賬戶腳本來替換舊腳本，未來的資產賬戶也會采納新的腳本。建議您立即升級以使用新的賬戶腳本。',
        buttons: {
          migrate: '安全升級',
          skip: '已知風險，稍後升級'
        }
      },
      'acp-migration-completed': {
        title: '恭喜！您已經完成安全升級。',
        message: '恭喜！您已經完成安全升級。',
        buttons: {
          ok: 'OK'
        }
      },
      'hard-fork-migrate': {
        message: '為適配最新版本的 CKB 節點，Neuron 將會重新同步鏈上數據，整個同步可能時間較長'
      }
    },
    prompt: {
      password: {
        label: '請輸入密碼',
        submit: '提交',
        cancel: '取消'
      }
    },
    updater: {
      'update-not-available': '沒有可供升級的新版本。'
    },
    common: {
      yes: '是',
      no: '否',
      ok: '確定',
      error: '錯誤'
    },
    'export-debug-info': {
      'export-debug-info': '導出除錯信息',
      'debug-info-exported': '除錯信息已被導出至 {{ file }}'
    },
    about: {
      'app-version': '{{name}} 版本: {{version}}',
      'ckb-client-version': 'CKB 節點版本: {{version}}'
    },
    settings: {
      title: {
        normal: '設置',
        mac: '偏好設置'
      }
    },
    'export-transactions': {
      'export-transactions': '導出交易歷史',
      'transactions-exported': '{{total}} 條交易記錄已被導出至 {{file}}',
      column: {
        time: '時間',
        'block-number': '區塊高度',
        'tx-hash': '交易哈希',
        'tx-type': '交易類型',
        amount: 'CKB 金額',
        'udt-amount': 'UDT 金額',
        description: '備註'
      },
      'tx-type': {
        send: '轉賬',
        receive: '收款'
      }
    },
    'offline-signature': {
      'export-transaction': '導出交易為 JSON 檔案',
      'transaction-exported': '交易已被導出至 {{filePath}}.',
      'load-transaction': '加載交易檔案'
    },
    'multisig-config': {
      'import-config': '導入多簽配置',
      'export-config': '導出多簽配置',
      'config-exported': '多簽配置已被導出至 {{filePath}}.',
      'import-duplicate': '請檢查是否存在重複配置',
      'import-result': '導入成功 {{success}} 個，失敗 {{fail}} 個。{{failCheck}}',
      'confirm-delete': '確認刪除該多簽地址嗎？',
      'delete-actions': {
        ok: '確認',
        cancel: '取消'
      }
    }
  }
}
