cask "electron-tora" do
  version "1.0.1"
  sha256 "027b92b9afeffb348b984ed8fd45ace8991ed4f06eec8cd9ad5f1f00b15b7668"

  url "https://cdn.golia.jp/test/electron-tora-#{version}.dmg"
  name "electron-tora"
  desc "electron-tora desc"
  homepage "https://golia.jp"

  app "electron-tora.app"

  zap trash: [
      '~/Library/Application Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.ApplicationRecentDocuments/jp.golia.electron-tora.sfl3',
      '~/Library/Application Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.ApplicationRecentDocuments/electron-tora.sfl3',
      '~/Library/Application Support/electron-tora',
      '~/Library/Saved Application State/electron-tora.savedState',
      '~/Library/Saved Application State/jp.golia.electron-tora.savedState',
      '~/Library/Preferences/electron-tora.plist',
      '~/Library/Preferences/jp.golia.electron-tora.plist',
      '~/Library/Application Scripts/KF79DRC524.jp.golia.electron-tora',
      '~/Library/Application Scripts/jp.golia.electron-tora',
      '~/Library/Parallels/Applications Menus/{1fcb9b5b-fb4b-46f6-ac5c-ff2a1e18da8b} Applications Menu.localized/Accessories/electron-tora',
      '~/Library/HTTPStorages/jp.golia.electron-tora',
      '~/Library/Logs/Transporter/KF79DRC524_electron-tora__2024-05-15-153009.txt',
      '~/Library/Logs/electron-tora',
      '~/Library/Group Containers/KF79DRC524.jp.golia.electron-tora',
      '~/Library/Group Containers/KF79DRC524.jp.golia.electron-tora/Library/Application Scripts/KF79DRC524.jp.golia.electron-tora',
    ]
end