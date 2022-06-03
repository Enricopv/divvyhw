// LineGraphViewManager.swift

import Foundation
@objc(CompanyGraphViewManager)
class CompanyGraphViewManager: RCTViewManager {

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return CompanyGraphView()
  }
  
}
