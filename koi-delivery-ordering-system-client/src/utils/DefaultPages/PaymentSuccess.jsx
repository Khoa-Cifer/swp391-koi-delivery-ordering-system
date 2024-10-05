import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Navigate to the homepage
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Payment Successful!</h1>
            <p style={styles.message}>Thank you for your payment. Your order has been processed successfully.</p>

            <div style={styles.orderSummary}>
                <h2>Order Summary</h2>
                <p><strong>Order ID:</strong> 123456789</p>
                <p><strong>Amount:</strong> $49.99</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            <button style={styles.button} onClick={handleGoHome}>
                Return to Homepage
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#28a745',
    },
    message: {
        fontSize: '1.2rem',
        margin: '10px 0',
    },
    orderSummary: {
        margin: '20px 0',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        width: '300px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default PaymentSuccess;
