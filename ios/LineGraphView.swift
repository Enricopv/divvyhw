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
      print("DATA FROM TSX: ", data)
    }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    self.addSubview(lineChartView)
    lineChartView.centerInSuperview()
    lineChartView.width(to: self)
    lineChartView.height(to: self)
    setData()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  lazy var lineChartView: LineChartView = {
    let chartView = LineChartView()
   
    chartView.backgroundColor = .systemBlue
    chartView.rightAxis.enabled = false
    let yAxis = chartView.leftAxis
    
    yAxis.labelFont = .boldSystemFont(ofSize: 12)
    yAxis.setLabelCount(6, force: false)
    yAxis.labelTextColor = .white
    yAxis.axisLineColor = .white
    
    chartView.xAxis.labelPosition = .bottom
    
    
    return chartView
  }()
  
  func setData() {

    let chartData: [ChartDataEntry] = [
       ChartDataEntry(x: 0.0, y: 10.0),
       ChartDataEntry(x: 1.0, y: 12.0),
       ChartDataEntry(x: 2.0, y: 16.0),
       ChartDataEntry(x: 3.0, y: 11.0)
     ]

    let dataSet = LineChartDataSet(entries: chartData, label: "Revenue")
    let nextEntry = ChartDataEntry.init(x: 4.0, y: 15.0)

    dataSet.append(nextEntry)

    let lineData = LineChartData(dataSet: dataSet)

    lineChartView.data = lineData
  }

  
}
