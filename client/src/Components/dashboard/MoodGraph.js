import React from "react";
import { Line } from "react-chartjs-2";


function MoodGraph() {

    // let dateCreated = record.moods.createdAt;

    const data = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
            {
                label: 'Moods',
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
                data: [9, 4, 6, 5, 8, 3, 5]
            }
        ]
    };


    return (
        <div>
            <h2>This is how I've felt over the last week:</h2>
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