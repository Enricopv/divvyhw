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
  
  let months: Dictionary<Double,String> = [0: "Oct", 100: "Nov", 200: "Dec", 300: "Jan", 400: "Feb", 500: "Mar"]
  
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
  
  @objc var yAxisEnabled: NSNumber = 1 {
    didSet {
      lineChartView.leftAxis.enabled = Bool(truncating: yAxisEnabled)
      lineChartView.notifyDataSetChanged()
    }
  }
  
  @objc var xAxisEnabled: NSNumber = 1 {
    didSet {
      lineChartView.xAxis.enabled = Bool(truncating: xAxisEnabled)
      lineChartView.notifyDataSetChanged()
    }
  }
  
  @objc var legendEnabled: NSNumber = 1 {
    didSet {
      lineChartView.legend.enabled = Bool(truncating: legendEnabled)
      lineChartView.notifyDataSetChanged()
    }
  }
  
  
  
  
  @objc var data: NSArray = [] {
      didSet {
        let pData = data as! [Dictionary<String, Any>]
        
        let dataSets = pData.map { dataSet -> LineChartDataSet in
          
          let chartData = LineChartDataSet(entries: [], label: "Revenue")
          let revenue = dataSet["revenue"] as! [Dictionary<String, Any>]
          let graphOptions = dataSet["graphOptions"] as! Dictionary<String, Any>
          
          var i = 0.00
          let reversedRevenue = revenue.reversed() as [Dictionary<String, Any>]
          reversedRevenue.forEach{ period in
            
            let value = period["value"] as! Double
            let entry = ChartDataEntry.init(x: Double(i * 100), y: value)
            
            chartData.append(entry)
            i += 1
          }
          
          
          let color =  graphOptions["color"] == nil ? "#189E6C" : graphOptions["color"] as! String
          
          let chartColor = hexStringToUIColor(hex: color)
          
          chartData.label = dataSet["name"] != nil ? dataSet["name"] as! String : ""
          
          chartData.setColor(chartColor)
          chartData.lineWidth = 2.0
          chartData.mode = .cubicBezier
          
          chartData.fill = Fill(color: chartColor)
          chartData.fillAlpha = 0.5
          
          
          let drawCirclesEnabled = graphOptions["drawCirclesEnabled"] == nil ? 0 : graphOptions["drawCirclesEnabled"]
          let drawFilledEnabled = graphOptions["drawFilledEnabled"] == nil ? 0 : graphOptions["drawFilledEnabled"]
          let drawValuesEnabled = graphOptions["drawValuesEnabled"] == nil ? 0 : graphOptions["drawValuesEnabled"]
          
          chartData.drawCirclesEnabled = Bool(truncating: drawCirclesEnabled as! NSNumber)
          chartData.drawFilledEnabled = Bool(truncating: drawFilledEnabled as! NSNumber)
          chartData.drawValuesEnabled = Bool(truncating: drawValuesEnabled as! NSNumber)
          
          return chartData
        }
        
       
        lineChartView.data = LineChartData(dataSets: dataSets)
      
    }
  }
  

  
  
  lazy var lineChartView: LineChartView = {
    let chartView = LineChartView()
   
    chartView.rightAxis.enabled = false
    let yAxis = chartView.leftAxis
    let xAxis = chartView.xAxis
    
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
    
    chartView.legend.enabled = true
    
    
    
    chartView.isMultipleTouchEnabled = false
    chartView.doubleTapToZoomEnabled = false
    chartView.data?.setDrawValues(false)
    
    
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
