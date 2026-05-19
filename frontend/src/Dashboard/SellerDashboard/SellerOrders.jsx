import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Replace with logged-in seller email
  const sellerEmail = "seller@gmail.com";

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [search, statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/seller-orders/${sellerEmail}`
      );

      setOrders(res.data);
      setFilteredOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (search) {
      filtered = filtered.filter((order) =>
        order.transactionId
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status === statusFilter
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/payments/status/${id}`,
        { status }
      );

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // Statistics
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6  w-[1250px]">
      <h1 className="text-3xl font-bold mb-6">
        Seller Orders
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold">
            ৳{totalRevenue}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Delivered</h2>
          <p className="text-3xl font-bold text-green-600">
            {deliveredOrders}
          </p>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Transaction ID"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="all">All Status</option>
          <option value="VALID">VALID</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">

        <table className="table w-full">

          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredOrders.map((order, index) => (
              <tr key={order._id}>

                <td>{index + 1}</td>

                <td className="font-semibold">
                  {order.transactionId}
                </td>

                <td>{order.email}</td>

                <td>
                  ৳{order.amount}
                </td>

                <td>
                  <span
                    className={`badge
                    ${
                      order.status === "Delivered"
                        ? "badge-success"
                        : order.status === "Pending"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td>

                  <select
                    className="select select-bordered select-sm"
                    defaultValue={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option disabled>
                      Update
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>
        </div>
      )}
    </div>
  );
}

export default SellerOrders;

