"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../../middleware/auth"));
var Member_1 = require("../../models/Member");
// @route    POST api/member
// @desc     Create a member
// @access   Private
router.post("/", [
    auth_1.default,
    [
        express_validator_1.check("memberTeamName", "Enter member's Team Name to continue")
            .not()
            .isEmpty(),
    ],
], function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, errors, _a, memberTeamName, memberSeasons, memberPlayoffs, memberChampionships, memberLastPlaces, memberFields, member, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                req = expressRequest;
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, memberTeamName = _a.memberTeamName, memberSeasons = _a.memberSeasons, memberPlayoffs = _a.memberPlayoffs, memberChampionships = _a.memberChampionships, memberLastPlaces = _a.memberLastPlaces;
                memberFields = {};
                memberFields.user = req.user.id;
                if (memberTeamName)
                    memberFields.memberTeamName = memberTeamName;
                if (memberSeasons) {
                    memberFields.memberSeasons = memberSeasons
                        .split(",")
                        .map(function (memberSeason) { return memberSeason.trim(); });
                }
                if (memberPlayoffs) {
                    memberFields.memberPlayoffs = memberPlayoffs
                        .split(",")
                        .map(function (memberPlayoff) { return memberPlayoff.trim(); });
                }
                if (memberChampionships) {
                    memberFields.memberChampionships = memberChampionships
                        .split(",")
                        .map(function (memberChampionship) { return memberChampionship.trim(); });
                }
                if (memberLastPlaces) {
                    memberFields.memberLastPlaces = memberLastPlaces
                        .split(",")
                        .map(function (memberLastPlace) { return memberLastPlace.trim(); });
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                member = new Member_1.Member(memberFields);
                return [4 /*yield*/, member.save()];
            case 2:
                _b.sent();
                res.json(member);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error(err_1.message);
                res.status(500).send("Server Error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route    GET api/member/all
// @desc     Get current user's members
// @access   Private
router.get("/all", auth_1.default, function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, members, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = expressRequest;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Member_1.Member.find({ user: req.user.id })];
            case 2:
                members = _a.sent();
                if (!members) {
                    return [2 /*return*/, res.status(400).json({ msg: "You haven't added any members" })];
                }
                res.json(members);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2.message);
                res.status(500).send("Server error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route    Get api/member/:member_id
// @desc     Get member by ID
// @access   Private
router.get("/:member_id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var member, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Member_1.Member.findById(req.params.member_id)];
            case 1:
                member = _a.sent();
                if (!member) {
                    return [2 /*return*/, res.status(404).json({ msg: "Member not found" })];
                }
                res.json(member);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3.message);
                if (err_3.kind === "ObjectId") {
                    return [2 /*return*/, res.status(404).json({ msg: "Member not found" })];
                }
                res.status(500).send("Server Error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route    Post api/member/:member_id
// @desc     Edit a member
// @access   Private
router.post("/:member_id", [
    auth_1.default,
    [
        express_validator_1.check("memberTeamName", "Enter member's Team Name to continue")
            .not()
            .isEmpty(),
    ],
], function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, errors, _a, memberTeamName, memberSeasons, memberPlayoffs, memberChampionships, memberLastPlaces, memberFields, member, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                req = expressRequest;
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, memberTeamName = _a.memberTeamName, memberSeasons = _a.memberSeasons, memberPlayoffs = _a.memberPlayoffs, memberChampionships = _a.memberChampionships, memberLastPlaces = _a.memberLastPlaces;
                memberFields = {};
                if (memberTeamName)
                    memberFields.memberTeamName = memberTeamName;
                if (memberSeasons) {
                    memberFields.memberSeasons = memberSeasons
                        .split(",")
                        .map(function (memberSeason) { return memberSeason.trim(); });
                }
                if (memberPlayoffs) {
                    memberFields.memberPlayoffs = memberPlayoffs
                        .split(",")
                        .map(function (memberPlayoff) { return memberPlayoff.trim(); });
                }
                if (memberChampionships) {
                    memberFields.memberChampionships = memberChampionships
                        .split(",")
                        .map(function (memberChampionship) { return memberChampionship.trim(); });
                }
                if (memberLastPlaces) {
                    memberFields.memberLastPlaces = memberLastPlaces
                        .split(",")
                        .map(function (memberLastPlace) { return memberLastPlace.trim(); });
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Member_1.Member.findById(req.params.member_id)];
            case 2:
                member = _b.sent();
                console.log(member);
                if (!member) return [3 /*break*/, 4];
                return [4 /*yield*/, Member_1.Member.findOneAndUpdate({ user: req.user.id }, { $set: memberFields }, { new: true })];
            case 3:
                // Update member
                member = _b.sent();
                return [2 /*return*/, res.json(member)];
            case 4: return [4 /*yield*/, member.save()];
            case 5:
                _b.sent();
                res.json(member);
                return [3 /*break*/, 7];
            case 6:
                err_4 = _b.sent();
                console.error(err_4.message);
                res.status(500).send("Server Error");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// @route    Delete api/member/:member_id
// @desc     Delete member by ID
// @access   Private
router.delete("/:member_id", auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var member, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Member_1.Member.findById(req.params.member_id)];
            case 1:
                member = _a.sent();
                return [4 /*yield*/, Member_1.Member.findOneAndDelete({ member: member })];
            case 2:
                // Delete member
                member = _a.sent();
                res.json({ msg: "Member deleted" });
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                console.error(err_5.message);
                if (err_5.kind === "ObjectId") {
                    return [2 /*return*/, res.status(404).json({ msg: "Member not found" })];
                }
                res.status(500).send("Server Error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// // @route    PUT api/member/:id/drafts
// // @desc     Add draft to member
// // @access   Private
// router.put(
//   '/:id/drafts',
//   [
//     auth,
//     [
//       check('year', 'Year is required')
//         .not()
//         .isEmpty(),
//       check('qb', 'QB is required')
//         .not()
//         .isEmpty(),
//       check('rb1', 'RB1 is required')
//         .not()
//         .isEmpty(),
//       check('rb2', 'RB2 is required')
//         .not()
//         .isEmpty(),
//       check('wr1', 'WR1 is required')
//         .not()
//         .isEmpty(),
//       check('wr2', 'WR2 is required')
//         .not()
//         .isEmpty(),
//       check('te', 'TE is required')
//         .not()
//         .isEmpty(),
//       check('dst', 'D/ST is required')
//         .not()
//         .isEmpty(),
//       check('k', 'K is required')
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { year, qb, rb1, rb2, rb3, wr1, wr2, wr3, te, k, dst } = req.body;
//     const newDraft = {
//       year,
//       qb,
//       rb1,
//       rb2,
//       rb3,
//       wr1,
//       wr2,
//       wr3,
//       te,
//       k,
//       dst
//     };
//     try {
//       const member = await Member.findById(req.params.id);
//       member.drafts.unshift(newDraft);
//       await member.save();
//       res.json(member);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );
module.exports = router;
