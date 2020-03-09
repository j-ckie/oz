import React from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

import store from "../../redux/store";


function MoodGraph() {
    const state = store.getState();

    console.log("====MOODGRAPH====")
    console.log(state.user.moods)

    let moodEntries = state.user.moods;

    // let lastDate = moodEntries[0].createdAt
    // console.log(`0: ${lastDate}`)
    // let testDate = dayjs(lastDate).format("dddd");
    // console.log(testDate)

    let labels = [];
    let points = [];

    for (let i = (moodEntries.length - 1); i >= 0; i--) {
        let date = moodEntries[i].createdAt;
        let newLabel = dayjs(date).format("dddd")
        labels.push(newLabel)

        points.push(moodEntries[i].mood)
    }



    const data = {
        labels: labels,
        datasets: [
            {
                label: 'mood',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: points
            }
        ]
    };


    return (
        <div>
            <h2 className="accent thin">This is how I've felt over the last week:</h2>
            <br />
            <Line data={data} options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 10,
                            min: 0
                        }
                    }]
                }
            }} />
        </div>
    );
}

export default MoodGraph;