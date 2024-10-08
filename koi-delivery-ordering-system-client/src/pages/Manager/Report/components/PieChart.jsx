import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['Group X', 'Group B', 'Group C', 'Group D'],
        datasets: [
            {
                data: [400, 300, 300, 200],
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
                hoverBackgroundColor: ['#0056b3', '#008d5a', '#e1a500', '#e06641'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return <Doughnut style={{ maxWidth: "180px", maxHeight:"300px" }} data={data} options={options} />;
};

export default PieChart;
