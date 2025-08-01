import Head from "next/head";

export default function Affichage() {
  return (
    <>
      <Head>
        <title>Afficher Positions</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="/affichage.js" defer></script>
      </Head>

      <div className="container">
        <h1>Positions des utilisateurs</h1>
        <div className="table-container">
          <div id="positions" className="loading">
            <i className="fas fa-spinner fa-spin"></i> Chargement des
            positions...
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --primary-color: #4361ee;
          --secondary-color: #3f37c9;
          --light-color: #f8f9fa;
          --dark-color: #212529;
          --success-color: #4bb543;
          --info-color: #17a2b8;
          --warning-color: #ffc107;
          --danger-color: #dc3545;
        }

        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f7fa;
          color: var(--dark-color);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: var(--secondary-color);
          font-weight: 600;
        }

        .table-container {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 30px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background-color: var(--primary-color);
          color: white;
        }

        th {
          padding: 15px;
          text-align: left;
          font-weight: 500;
        }

        tbody tr {
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.2s;
        }

        tbody tr:hover {
          background-color: #f8f9fa;
        }

        td {
          padding: 12px 15px;
          vertical-align: top;
        }

        .user-id {
          font-family: "Courier New", Courier, monospace;
          font-size: 0.9em;
          color: #6c757d;
        }

        .position-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px dashed #e0e0e0;
        }

        .position-item:last-child {
          border-bottom: none;
        }

        .coordinates {
          font-family: "Courier New", Courier, monospace;
          margin-right: 10px;
        }

        .btn-group {
          display: flex;
          gap: 8px;
        }

        .btn {
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.85em;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s;
          text-decoration: none;
        }

        .btn-info {
          background-color: var(--info-color);
          color: white;
        }

        .btn-info:hover {
          background-color: #138496;
        }

        .btn-success {
          background-color: var(--success-color);
          color: white;
        }

        .btn-success:hover {
          background-color: #3a9e32;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #6c757d;
          font-size: 1.1em;
        }

        .error {
          color: var(--danger-color);
          text-align: center;
          padding: 20px;
        }

        @media (max-width: 768px) {
          .table-container {
            overflow-x: auto;
          }

          table {
            min-width: 600px;
          }

          .btn-group {
            flex-direction: column;
            gap: 5px;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
