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
      
      
      if let parsedData = data as? [Dictionary<String,Double>] {
        parsedData.forEach { point in
         let entry = ChartDataEntry.init(x: point["x"]!, y: point["y"]!)
          chartData.append(entry)
        }
        
        lineChartView.data = LineChartData(dataSet: chartData)
        
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
    yAxis.setLabelCount(6, force: false)
    yAxis.labelTextColor = .white
    yAxis.axisLineColor = .white
    
    chartView.xAxis.labelPosition = .bottom
    
    
    return chartView
  }()
  
 

  
}
