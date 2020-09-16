"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
var mongoose_1 = require("mongoose");
var Draft_1 = require("../models/Draft");
var MemberSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    memberTeamName: {
        type: String,
        required: true,
        max: 40,
    },
    memberSeasons: {
        type: [Number],
    },
    memberPlayoffs: {
        type: [Number],
    },
    memberChampionships: {
        type: [Number],
    },
    memberLastPlaces: {
        type: [Number],
    },
    memberDrafts: {
        type: { Draft: Draft_1.Draft },
    },
});
exports.Member = mongoose_1.model("member", MemberSchema);
