import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import Paginate from "../components/Paginate";
function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      <div className="my-4">
        <h2>Orders list:</h2>
        <hr className="w-25" />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2 variant="danger">{error}</h2>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-md text-center">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Initiated by</th>
                <th>Ordered date</th>
                <th>Transaction</th>
                <th>Payment status</th>
                <th>Delivery status</th>
                <th>Product action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Rs. {order.totalPrice}</td>

                  <td>
                    {order.isPaid ? (
                      <>
                        {order.paidAt.substring(0, 10)}
                      </>
                    ) : (
                      <>
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>{" "}
                      </>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      <>
                        {order.deliveredAt.substring(0, 10)}
                      </>
                    ) : (
                      <>
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>{" "}
                      </>
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="outline-success" className="btn-sm rounded">
                        Get details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
}

export default OrderListScreen;
