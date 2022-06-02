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

class XAxisFormatter : IAxisValueFormatter {
  
  let months: Dictionary<Double,String> = [0: "Oct",100: "Nov", 200: "Dec", 300: "Jan", 400: "Feb", 500: "Mar"]
  
  func stringForValue(_ value: Double, axis: AxisBase?) -> String {
    return months[value] ?? String(value)
  }
  
}

class YAxisFormatter : IAxisValueFormatter {
  
  func stringForValue(_ value: Double, axis: AxisBase?) -> String {
    
    let thousand = value / 1000
    
    let million = value / 1000000
    
    if million >= 1.0 {
      return "\(round(million * 10 / 10))M"
    } else if thousand >= 1.0 {
      return "\(round(thousand * 10) / 10))K"
    }
    
    return String(value)
  }
}


class CompanyGraphView: UIView, ChartViewDelegate {
  
  

  
  @objc var data: NSDictionary = [:] {
      didSet {
        let chartData = LineChartDataSet(entries: [], label: "Revenue")
        
        let pData = data as! Dictionary<String, Any>
        let revenue = pData["revenue"] as! [Dictionary<String, Any>]
        
        var i = 0.00
        revenue.forEach{ period in
          
          let value = period["value"] as! Double
          let entry = ChartDataEntry.init(x: Double(i * 100), y: value)
          
          chartData.append(entry)
          i += 1
      }
        
        chartData.setColor(NSUIColor.red)
        chartData.drawCirclesEnabled = true
        chartData.lineWidth = 2.0
        chartData.mode = .cubicBezier
        chartData.fill = Fill(color: .red)
        chartData.fillAlpha = 0.5
        chartData.drawFilledEnabled = true
        
        
       
        lineChartView.data = LineChartData(dataSets: [chartData])
        lineChartView.data?.setDrawValues(false)
      
      
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
    let xAxis = chartView.xAxis
    
    yAxis.enabled = true
    yAxis.labelFont = .boldSystemFont(ofSize: 10)
    yAxis.labelTextColor = .black
    yAxis.axisLineColor = .black
    yAxis.labelPosition = .insideChart
    yAxis.valueFormatter = YAxisFormatter()
    
    
    xAxis.labelFont = .boldSystemFont(ofSize: 10)
    xAxis.setLabelCount(6, force: true)
    xAxis.valueFormatter = XAxisFormatter()
    
    
    chartView.xAxis.labelPosition = .bottom
    chartView.drawGridBackgroundEnabled = false
    
    chartView.legend.enabled = false
    
    chartView.isMultipleTouchEnabled = false
    
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
