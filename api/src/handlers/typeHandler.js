const { getAllTypes } = require("../controllers/typeController");

const getTypes = async (req, res) => {
  try {
    const response = await getAllTypes();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTypes };
