//
//  LineGraphView.swift
//  divvyhw
//
//  Created by Enrico Valbuena on 5/31/22.
//

import Foundation
import UIKit
import Charts
import TinyConstraints


class LineGraphView: UIView, ChartViewDelegate {
  
  @objc var data: NSArray = [] {
      didSet {
        let chartData = LineChartDataSet(entries: [], label: "Revenue")
        let chartData2 = LineChartDataSet(
          entries: [
            ChartDataEntry(x: 0.0, y: 10.0),
            ChartDataEntry(x: 1.0, y: 5.0),
            ChartDataEntry(x: 2.0, y: 32.0),
            ChartDataEntry(x: 3.0, y: 28.0),
            ChartDataEntry(x: 4.0, y: 20.0)
          ],
          label: "Revenue2"
        )
      
      
      if let parsedData = data as? [Dictionary<String,Double>] {
        parsedData.forEach { point in
         let entry = ChartDataEntry.init(x: point["x"]!, y: point["y"]!)
          chartData.append(entry)
        }
        
        chartData.setColor(NSUIColor.red)
        chartData.drawCirclesEnabled = false
        chartData.lineWidth = 2.0
        chartData.mode = .cubicBezier
        chartData.fill = Fill(color: .red)
        chartData.fillAlpha = 0.5
        chartData.drawFilledEnabled = true
        
        
        chartData2.setColor(NSUIColor.cyan)
        chartData2.drawCirclesEnabled = false
        chartData2.lineWidth = 2.0
        chartData2.mode = .cubicBezier
        chartData2.fill = Fill(color: .cyan)
        chartData2.fillAlpha = 0.5
        chartData2.drawFilledEnabled = true
        
        
        
        
        lineChartView.data = LineChartData(dataSets: [chartData, chartData2])
        lineChartView.data?.setDrawValues(false)
        
        
      }
    }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    self.addSubview(lineChartView)
    lineChartView.centerInSuperview()
    lineChartView.width(to: self)
    lineChartView.height(to: self)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  lazy var lineChartView: LineChartView = {
    let chartView = LineChartView()
   
    chartView.rightAxis.enabled = false
    let yAxis = chartView.leftAxis
    
    yAxis.labelFont = .boldSystemFont(ofSize: 12)
//    yAxis.setLabelCount(6, force: false)
//    yAxis.labelTextColor = .white
//    yAxis.axisLineColor = .white
    yAxis.enabled = false
    
    
    chartView.xAxis.labelPosition = .bottom
    chartView.drawGridBackgroundEnabled = false
    
    
    return chartView
  }()
  
 
  func hexStringToUIColor (hex:String) -> UIColor {
      var cString:String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

      if (cString.hasPrefix("#")) {
          cString.remove(at: cString.startIndex)
      }

      if ((cString.count) != 6) {
          return UIColor.gray
      }

      var rgbValue:UInt64 = 0
      Scanner(string: cString).scanHexInt64(&rgbValue)

      return UIColor(
          red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
          green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
          blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
          alpha: CGFloat(1.0)
      )
  }

  
}
