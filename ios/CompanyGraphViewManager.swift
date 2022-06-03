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
  
  @objc func updateFromManager(_ node: NSNumber, activeLineId: NSNumber) {
     
     DispatchQueue.main.async {
       let component = self.bridge.uiManager.view(
         forReactTag: node
       ) as! CompanyGraphView
       component.setActiveLineId(id: activeLineId)
     }
   }
}
