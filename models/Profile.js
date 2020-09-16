"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var mongoose_1 = require("mongoose");
var Draft_1 = require("../models/Draft");
var ProfileSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    teamName: {
        type: String,
        required: true,
        max: 40,
    },
    motto: {
        type: String,
        max: 40,
    },
    seasons: {
        type: [Number],
    },
    playoffs: {
        type: [Number],
    },
    championships: {
        type: [Number],
    },
    lastPlaces: {
        type: [Number],
    },
    drafts: {
        type: { Draft: Draft_1.Draft },
    },
});
exports.Profile = mongoose_1.model("profile", ProfileSchema);
