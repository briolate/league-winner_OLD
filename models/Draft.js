"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draft = void 0;
var mongoose_1 = require("mongoose");
var DraftSchema = new mongoose_1.Schema({
    year: {
        type: Number,
        required: true,
    },
    qb: {
        type: Number,
        required: true,
    },
    rb1: {
        type: Number,
        required: true,
    },
    rb2: {
        type: Number,
        required: true,
    },
    rb3: {
        type: Number,
    },
    wr1: {
        type: Number,
        required: true,
    },
    wr2: {
        type: Number,
        required: true,
    },
    wr3: {
        type: Number,
    },
    te: {
        type: Number,
        required: true,
    },
});
exports.Draft = mongoose_1.model("draft", DraftSchema);
