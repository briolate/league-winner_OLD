import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();

import auth from "../../middleware/auth";

import { User } from "../../models/User";
import { Member, IMember } from "../../models/Member";
import { Profile, IProfile } from "../../models/Profile";
import { Draft, IDraft } from "../../models/Draft";

interface RequestCustom extends Request {
  user: any;
}

// @route    GET api/profile/me
// @desc     Get current user's profile
// @access   Private
router.get(
  "/me",
  <any>auth,
  async (expressRequest: Request, res: Response<any>) => {
    const req = expressRequest as RequestCustom;

    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["name"]);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    <any>auth,
    [
      check("teamName", "Enter Team Name to continue")
        .not()
        .isEmpty(),
      check("seasons", "Add at least one season to continue")
        .not()
        .isEmpty(),
    ],
  ],
  async (expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestCustom;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      teamName,
      motto,
      seasons,
      playoffs,
      championships,
      lastPlaces,
    } = req.body;

    // Build profile object
    const profileFields = <IProfile>{};

    profileFields.user = req.user.id;
    if (teamName) profileFields.teamName = teamName;
    if (motto) profileFields.motto = motto;
    if (seasons) {
      profileFields.seasons = seasons
        .split(",")
        .map((season: string) => season.trim());
    }
    if (playoffs) {
      profileFields.playoffs = playoffs
        .split(",")
        .map((playoff: string) => playoff.trim());
    }
    if (championships) {
      profileFields.championships = championships
        .split(",")
        .map((championship: string) => championship.trim());
    }
    if (lastPlaces) {
      profileFields.lastPlaces = lastPlaces
        .split(",")
        .map((lastPlace: string) => lastPlace.trim());
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      // Create profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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
router.get("/user/:user_id", async (expressRequest: Request, res: Response) => {
  const req = expressRequest as RequestCustom;

  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile and user
// @access   Private

router.delete(
  "/",
  <any>auth,
  async (expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestCustom;

    try {
      // Remove user's members
      await Member.deleteMany({ user: req.user.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: "User has been deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    POST api/profile/drafts
// @desc     Add draft to profile
// @access   Private
router.post(
  "/drafts",
  [
    <any>auth,
    [
      check("year", "Year is required")
        .not()
        .isEmpty(),
      check("qb", "QB is required")
        .not()
        .isEmpty(),
      check("rb1", "RB1 is required")
        .not()
        .isEmpty(),
      check("rb2", "RB2 is required")
        .not()
        .isEmpty(),
      check("wr1", "WR1 is required")
        .not()
        .isEmpty(),
      check("wr2", "WR2 is required")
        .not()
        .isEmpty(),
      check("te", "TE is required")
        .not()
        .isEmpty(),
    ],
  ],
  async (expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestCustom;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { year, qb, rb1, rb2, rb3, wr1, wr2, wr3, te } = req.body;

    // Build draft object
    const draftFields = <IDraft>{};

    draftFields.year = year;
    draftFields.qb = qb;
    draftFields.rb1 = rb1;
    draftFields.rb2 = rb2;
    draftFields.rb3 = rb3;
    draftFields.wr1 = wr1;
    draftFields.wr2 = wr2;
    draftFields.wr3 = wr3;
    draftFields.te = te;

    try {
      let draft = await Draft.findOne({ user: req.user.id });
      if (draft) {
        // Update profile
        draft = await Draft.findOneAndUpdate(
          { user: req.user.id },
          { $set: draftFields },
          { new: true }
        );

        return res.json(draft);
      }
      // Create profile
      draft = new Draft(draftFields);

      await draft.save();
      res.json(draft);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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
