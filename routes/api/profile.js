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
var User_1 = require("../../models/User");
var Member_1 = require("../../models/Member");
var Profile_1 = require("../../models/Profile");
var Draft_1 = require("../../models/Draft");
// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get("/me", auth_1.default, function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, profile, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = expressRequest;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Profile_1.Profile.findOne({
                        user: req.user.id,
                    }).populate("user", ["name"])];
            case 2:
                profile = _a.sent();
                if (!profile) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: "There is no profile for this user" })];
                }
                res.json(profile);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1.message);
                res.status(500).send("Server error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post("/", [
    auth_1.default,
    [
        express_validator_1.check("teamName", "Enter Team Name to continue")
            .not()
            .isEmpty(),
        express_validator_1.check("seasons", "Add at least one season to continue")
            .not()
            .isEmpty(),
    ],
], function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, errors, _a, teamName, motto, seasons, playoffs, championships, lastPlaces, profileFields, profile, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                req = expressRequest;
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, teamName = _a.teamName, motto = _a.motto, seasons = _a.seasons, playoffs = _a.playoffs, championships = _a.championships, lastPlaces = _a.lastPlaces;
                profileFields = {};
                profileFields.user = req.user.id;
                if (teamName)
                    profileFields.teamName = teamName;
                if (motto)
                    profileFields.motto = motto;
                if (seasons) {
                    profileFields.seasons = seasons
                        .split(",")
                        .map(function (season) { return season.trim(); });
                }
                if (playoffs) {
                    profileFields.playoffs = playoffs
                        .split(",")
                        .map(function (playoff) { return playoff.trim(); });
                }
                if (championships) {
                    profileFields.championships = championships
                        .split(",")
                        .map(function (championship) { return championship.trim(); });
                }
                if (lastPlaces) {
                    profileFields.lastPlaces = lastPlaces
                        .split(",")
                        .map(function (lastPlace) { return lastPlace.trim(); });
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Profile_1.Profile.findOne({ user: req.user.id })];
            case 2:
                profile = _b.sent();
                if (!profile) return [3 /*break*/, 4];
                return [4 /*yield*/, Profile_1.Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })];
            case 3:
                // Update profile
                profile = _b.sent();
                return [2 /*return*/, res.json(profile)];
            case 4:
                // Create profile
                profile = new Profile_1.Profile(profileFields);
                return [4 /*yield*/, profile.save()];
            case 5:
                _b.sent();
                res.json(profile);
                return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                console.error(err_2.message);
                res.status(500).send("Server Error");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// // @route    GET api/profile
// // @desc     Get all profiles
// // @access   Public
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const profiles = await Profile.find().populate("user", ["name"]);
//     res.json(profiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, profile, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = expressRequest;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Profile_1.Profile.findOne({
                        user: req.params.user_id,
                    }).populate("user", ["name"])];
            case 2:
                profile = _a.sent();
                if (!profile)
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found" })];
                res.json(profile);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error(err_3.message);
                if (err_3.kind == "ObjectId") {
                    return [2 /*return*/, res.status(400).json({ msg: "Profile not found" })];
                }
                res.status(500).send("Server Error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route    DELETE api/profile
// @desc     Delete profile and user
// @access   Private
router.delete("/", auth_1.default, function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req = expressRequest;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                // Remove user's members
                return [4 /*yield*/, Member_1.Member.deleteMany({ user: req.user.id })];
            case 2:
                // Remove user's members
                _a.sent();
                // Remove profile
                return [4 /*yield*/, Profile_1.Profile.findOneAndRemove({ user: req.user.id })];
            case 3:
                // Remove profile
                _a.sent();
                // Remove user
                return [4 /*yield*/, User_1.User.findOneAndRemove({ _id: req.user.id })];
            case 4:
                // Remove user
                _a.sent();
                res.json({ msg: "User has been deleted" });
                return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                console.error(err_4.message);
                res.status(500).send("Server Error");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// @route    POST api/profile/drafts
// @desc     Add draft to profile
// @access   Private
router.post("/drafts", [
    auth_1.default,
    [
        express_validator_1.check("year", "Year is required")
            .not()
            .isEmpty(),
        express_validator_1.check("qb", "QB is required")
            .not()
            .isEmpty(),
        express_validator_1.check("rb1", "RB1 is required")
            .not()
            .isEmpty(),
        express_validator_1.check("rb2", "RB2 is required")
            .not()
            .isEmpty(),
        express_validator_1.check("wr1", "WR1 is required")
            .not()
            .isEmpty(),
        express_validator_1.check("wr2", "WR2 is required")
            .not()
            .isEmpty(),
        express_validator_1.check("te", "TE is required")
            .not()
            .isEmpty(),
    ],
], function (expressRequest, res) { return __awaiter(void 0, void 0, void 0, function () {
    var req, errors, _a, year, qb, rb1, rb2, rb3, wr1, wr2, wr3, te, draftFields, draft, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                req = expressRequest;
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, year = _a.year, qb = _a.qb, rb1 = _a.rb1, rb2 = _a.rb2, rb3 = _a.rb3, wr1 = _a.wr1, wr2 = _a.wr2, wr3 = _a.wr3, te = _a.te;
                draftFields = {};
                draftFields.year = year;
                draftFields.qb = qb;
                draftFields.rb1 = rb1;
                draftFields.rb2 = rb2;
                draftFields.rb3 = rb3;
                draftFields.wr1 = wr1;
                draftFields.wr2 = wr2;
                draftFields.wr3 = wr3;
                draftFields.te = te;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Draft_1.Draft.findOne({ user: req.user.id })];
            case 2:
                draft = _b.sent();
                if (!draft) return [3 /*break*/, 4];
                return [4 /*yield*/, Draft_1.Draft.findOneAndUpdate({ user: req.user.id }, { $set: draftFields }, { new: true })];
            case 3:
                // Update profile
                draft = _b.sent();
                return [2 /*return*/, res.json(draft)];
            case 4:
                // Create profile
                draft = new Draft_1.Draft(draftFields);
                return [4 /*yield*/, draft.save()];
            case 5:
                _b.sent();
                res.json(draft);
                return [3 /*break*/, 7];
            case 6:
                err_5 = _b.sent();
                console.error(err_5.message);
                res.status(500).send("Server Error");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// @route    DELETE api/profile/drafts/:draft_id
// @desc     Delete draft from profile
// @access   Private
// router.delete(
//   "/drafts/:draft_id",
//   <any>auth,
//   async (expressRequest: Request, res: Response) => {
//     const req = expressRequest as RequestCustom;
//     try {
//       const profile = await Profile.findOne({ user: req.user.id });
//       // Get remove index
//       const removeIndex = profile.drafts
//         .map((draft) => draft.id)
//         .indexOf(req.params.edu_id);
//       profile.drafts.splice(removeIndex, 1);
//       await profile.save();
//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );
module.exports = router;
