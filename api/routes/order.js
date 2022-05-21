const Order = require("../models/Order.js");
const { tokenVerification, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./tokenVerification.js");
const router = require("express").Router();

// CREATE
router.post("/", tokenVerification, async (request, response) => {
    const newOrder = new Order(request.body);

    try {
        const savedOrder = await newOrder.save();
        response.status(200).json(savedOrder);
    } catch (error) {
        response.status(500).json(error);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (request, response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            request.params.id,
            { $set: request.body },
            { new: true }
        );
        response.status(200).json(updatedOrder);
    } catch (error) {
        response.status(500).json(error);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (request, response) => {
	try {
		await Order.findByIdAndDelete(request.params.id);
    	response.status(200).json("Order has been deleted...");
  	} catch (error) {
    	response.status(500).json(error);
  	}
});

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (request, response) => {
	try {
		const orders = await Order.find({ userId: request.params.userId });
		response.status(200).json(orders);
	} catch (error) {
		response.status(500).json(error);
	}
});

// GET ORDERS OF ALL USERS
router.get("/", verifyTokenAndAdmin, async (response) => {
	try {
		const orders = await Order.find();
		response.status(200).json(orders);
	} catch (error) {
		response.status(500).json(error);
	}
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (request, response) => {
	const productID = request.query.pid;
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

	try {
		const income = await Order.aggregate([
			{ 
				$match: { 
					createdAt: { $gte: previousMonth },
					...(productID && 
						{
							products: { $elemMatch: { productID } },
						}
					)
				}
			},
			{ 
				$project: { 
					month: { $month: "$createdAt" }, 
					sales: "$amount" 
				} 
			},
			{ 
				$group: {
					_id: "$month", 
					total: { $sum: "$sales" } 
				}
			}
		]);
		response.status(200).json(income);
	} catch (error) {
		response.status(500).json(error);
	}
});

module.exports = router;