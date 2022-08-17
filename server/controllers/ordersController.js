const {
  Orders,
  OrderDevice,
  Device,
  Brand,
  Type,
} = require("../models/models");
const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken");

class OrdersController {
  async create(req, res) {
    const auth = req.headers.authorization || "";
    const { mobile, basket } = req.body;

    try {
      let parseDevices = [];
      for (let key of basket) {
        parseDevices.push(key.id);
      }

      const isDeviceInDB = await Device.findAndCountAll({
        where: { id: parseDevices },
        attributes: ["id"],
      });

      if (isDeviceInDB.count === parseDevices.length) {
        const row = { mobile };
        if (auth) {
          const token = auth.split(" ")[1];
          const { id } = jwt.verify(token, process.env.SECRET_KEY);
          row.userId = id;
        }

        await Orders.create(row).then((order) => {
          const { id } = order.get();
          parseDevices.forEach(async (deviceId, i) => {
            await OrderDevice.create({
              orderId: id,
              deviceId
            });
          });
        });
      } else {
        const notFoundIdDevices = [];
        const arrDevices = [];
        isDeviceInDB.rows.forEach((item) => arrDevices.push(item.id));
        parseDevices.forEach((deviceId) => {
          if (!arrDevices.includes(deviceId)) {
            notFoundIdDevices.push(deviceId);
          }
        });
        return ApiError.badRequest(
          res.json(
            `Some Devices of id(${notFoundIdDevices.join(
              ", "
            )}) not exist in DB`
          )
        );
      }

      return res.json("Thank you for you order! We will contact you shortly");
    } catch (e) {
      return res.json(e);
    }
  }

  async updateOrder(req, res) {
    try {
      const { complete, id } = req.body;

      await Orders.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Orders.update({ complete }, { where: { id } }).then(() => {
            return res.json("Order updated");
          });
        } else {
          return res.json("This order doesn't exist in DB");
        }
      });
    } catch (e) {
      return res.json("Updated didn't complete because was error: " + e);
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.body;

      await Orders.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Orders.destroy({ where: { id } }).then(() => {
            return res.json("Order deleted");
          });
        } else {
          return res.json("This order doesn't exist in DB");
        }
      });
    } catch (e) {
      return res.json("Delete didn't complete because was error: " + e);
    }
  }

  async getAll(req, res) {
    const orders = await Orders.findAndCountAll();
    return res.json(orders);
  }
}

module.exports = new OrdersController();
