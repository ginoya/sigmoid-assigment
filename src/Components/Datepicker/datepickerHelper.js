
export const getDashboardPayload = (startDate,endDate, chartData) =>{
    return {
        "_id": `dashboard${chartData.id}`,
        "emailId": "candidate@sigmoid.com",
        "orgViewReq": {
          "organization": "DemoTest",
          "view": "Auction"
        },
        "chartObject": {
          "metadata": {
            "title": `chartobject:${chartData.id}`,
            "img_thumbnail": "../img/chart.png",
            "chartType": chartData.type,
            "dataLimit": 50
          },
          "requestParam": {
            "granularity": "hour",
            "timeZone": {
              "name": "UTC (+00:00)",
              "location": "UTC"
            },
            "dateRange": {
              "startDate": startDate.valueOf().toString(),
              "endDate": endDate.valueOf().toString()
            },
            "xAxis": [
              chartData.xAxis
            ],
            "yAxis": [
              "M002"
            ],
            "approxCountDistinct": [],
            "specialCalculation": [],
            "filter": [],
            "orderBy": {
              "metricOrdByList": [
                {
                  "id": "M002",
                  "desc": true
                }
              ]
            },
            "percentCalList": []
          }
        }
      }
}

export const getPieChartPayload = (startDate,endDate) =>{
    return {
        "_id": "Datastory_ChartId_1535224664111",
        "emailId": "candidate@sigmoid.com",
        "orgViewReq": {
          "organization": "DemoTest",
          "view": "Auction"
        },
        "chartObject": {
          "metadata": {
            "title": "",
            "img_thumbnail": "images/pie.png",
            "chartType": "pie",
            "dataLimit": 500
          },
          "text": [],
          "requestParam": {
            "granularity": "hour",
            "timeZone": {
              "name": "UTC (+00:00)",
              "location": "UTC"
            },
            "dateRange": {
              "startDate": startDate.valueOf().toString(),
              "endDate": endDate.valueOf().toString()
            },
            "xAxis": [
              "D005"
            ],
            "yAxis": [],
            "approxCountDistinct": [],
            "specialCalculation": [
              "CM001"
            ],
            "filter": [],
            "orderBy": {
              "customMetricOrdByList": [
                {
                  "id": "CM001",
                  "desc": true
                }
              ]
            },
            "percentCalList": [
              {
                "id": "CM001"
              }
            ]
          }
        }
      }
}