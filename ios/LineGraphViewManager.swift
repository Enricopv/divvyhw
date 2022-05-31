// LineGraphViewManager.swift

import Foundation
@objc(LineGraphViewManager)
class LineGraphViewManager: RCTViewManager {

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }


  override func view() -> UIView! {
    let label = UILabel()
    label.text = "From Swift Land"
    label.textAlignment = .center
    return label
  }
}
