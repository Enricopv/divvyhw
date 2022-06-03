// CompanyGraphViewManager.m
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(CompanyGraphViewManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(data, NSArray)
  RCT_EXPORT_VIEW_PROPERTY(data2, NSArray)
  RCT_EXPORT_VIEW_PROPERTY(yAxisEnabled, NSNumber)
  RCT_EXPORT_VIEW_PROPERTY(xAxisEnabled, NSNumber)
@end
