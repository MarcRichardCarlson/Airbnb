const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
