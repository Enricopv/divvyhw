// LineGraphViewManager.swift

import Foundation
@objc(LineGraphViewManager)
class LineGraphViewManager: RCTViewManager {

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return LineGraphView()
  }
}
