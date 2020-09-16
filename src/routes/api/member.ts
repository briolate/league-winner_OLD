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

// @route    POST api/member
// @desc     Create a member
// @access   Private
router.post(
  "/",
  [
    <any>auth,
    [
      check("memberTeamName", "Enter member's Team Name to continue")
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
      memberTeamName,
      memberSeasons,
      memberPlayoffs,
      memberChampionships,
      memberLastPlaces,
    } = req.body;

    // Build member object
    const memberFields = <IMember>{};

    memberFields.user = req.user.id;
    if (memberTeamName) memberFields.memberTeamName = memberTeamName;
    if (memberSeasons) {
      memberFields.memberSeasons = memberSeasons
        .split(",")
        .map((memberSeason: string) => memberSeason.trim());
    }
    if (memberPlayoffs) {
      memberFields.memberPlayoffs = memberPlayoffs
        .split(",")
        .map((memberPlayoff: string) => memberPlayoff.trim());
    }
    if (memberChampionships) {
      memberFields.memberChampionships = memberChampionships
        .split(",")
        .map((memberChampionship: string) => memberChampionship.trim());
    }
    if (memberLastPlaces) {
      memberFields.memberLastPlaces = memberLastPlaces
        .split(",")
        .map((memberLastPlace: string) => memberLastPlace.trim());
    }

    try {
      // Create member
      let member = new Member(memberFields);

      await member.save();
      res.json(member);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/member/all
// @desc     Get current user's members
// @access   Private
router.get(
  "/all",
  <any>auth,
  async (expressRequest: Request, res: Response) => {
    const req = expressRequest as RequestCustom;
    try {
      const members = await Member.find({ user: req.user.id });

      if (!members) {
        return res.status(400).json({ msg: "You haven't added any members" });
      }

      res.json(members);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    Get api/member/:member_id
// @desc     Get member by ID
// @access   Private
router.get("/:member_id", <any>auth, async (req, res) => {
  try {
    const member = await Member.findById(req.params.member_id);

    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    Post api/member/:member_id
// @desc     Edit a member
// @access   Private
router.post(
  "/:member_id",
  [
    <any>auth,
    [
      check("memberTeamName", "Enter member's Team Name to continue")
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
      memberTeamName,
      memberSeasons,
      memberPlayoffs,
      memberChampionships,
      memberLastPlaces,
    } = req.body;

    // Build member object
    const memberFields = <IMember>{};
    if (memberTeamName) memberFields.memberTeamName = memberTeamName;
    if (memberSeasons) {
      memberFields.memberSeasons = memberSeasons
        .split(",")
        .map((memberSeason: string) => memberSeason.trim());
    }
    if (memberPlayoffs) {
      memberFields.memberPlayoffs = memberPlayoffs
        .split(",")
        .map((memberPlayoff: string) => memberPlayoff.trim());
    }
    if (memberChampionships) {
      memberFields.memberChampionships = memberChampionships
        .split(",")
        .map((memberChampionship: string) => memberChampionship.trim());
    }
    if (memberLastPlaces) {
      memberFields.memberLastPlaces = memberLastPlaces
        .split(",")
        .map((memberLastPlace: string) => memberLastPlace.trim());
    }

    try {
      let member = await Member.findById(req.params.member_id);
      console.log(member);
      if (member) {
        // Update member
        member = await Member.findOneAndUpdate(
          { user: req.user.id },
          { $set: memberFields },
          { new: true }
        );

        return res.json(member);
      }

      await member!.save();
      res.json(member);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    Delete api/member/:member_id
// @desc     Delete member by ID
// @access   Private
router.delete("/:member_id", <any>auth, async (req, res) => {
  try {
    let member = await Member.findById(req.params.member_id);

    // Delete member
    member = await Member.findOneAndDelete({ member });

    res.json({ msg: "Member deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.status(500).send("Server Error");
  }
});

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
