import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
export const LevelOfExpertise = () => {
  return (
    <div className="expertise-info__container">
      <Title level={1} className="title">
        Five Stages of Acquiring Expertise - Novice to Expert
      </Title>
      <div className="expertise-info__items">
        <Title level={3}>1. The Novice Stage 👶</Title>
        <Paragraph>
          The novice stage is the first level of skill acquisition, where you
          are just getting started in the skill and have little familiarity with
          it. The defining element of the novice is a reliance on recipes.
          Novices need clear instructions on how to do something in order to do
          it. They don’t have an intuitive understanding of the skill, so they
          need someone else’s recipes to follow in order to complete any task
          within the skill.
        </Paragraph>
      </div>
      <div className="expertise-info__items">
        <Title level={3}>2. The Advanced Beginner Stage ✨</Title>
        <Paragraph>
          The novice becomes an advanced beginner when they can start to
          troubleshoot their problems and work on their own. You’re still
          primarily using recipes, but you have more contextual awareness of
          when to use which recipes. You don’t have a full “big picture” view of
          the skill yet, but you’re starting to develop more context and are not
          completely lost when something goes wrong. Instead of blaming the
          recipe when you hit an error, you know to look for another recipe.
        </Paragraph>
      </div>
      <div className="expertise-info__items">
        <Title level={3}>3. The Competent Stage ❤️</Title>
        <Paragraph>
          As you progress through the Advanced Beginner stage, you add more and
          more recipes and maxims to your experience with the skill that help
          you perform better and better. Eventually, you hit the point where
          it’s completely overwhelming and you have to develop rules about what
          recipes to apply when. While the Novice and Advanced Beginner are
          largely detached from the outcomes, the Competent can experience joy
          at making the right choice of recipes and remorse at choosing the
          wrong one.
        </Paragraph>
      </div>
      <div className="expertise-info__items">
        <Title level={3}>4. The Proficient Stage 🧠</Title>
        <Paragraph>
          As you react emotionally to your decisions at the level of Competence,
          your positive and negative responses to decisions will reinforce the
          correct ones and discourage the incorrect ones and you will develop an
          increasingly intuitive sense of what recipes and maxims to apply to
          the situation.
        </Paragraph>
      </div>
      <div className="expertise-info__items">
        <Title level={3}>5. The Expert Stage 🔥</Title>
        <Paragraph>
          The Expert operates entirely by intuition. He or she knows what their
          goal should be, what to do about it, and what should happen as a
          result. They’re emotionally involved and invested in the whole
          process, and since they’re running on intuition, they might have a
          hard time explaining why they do things to non-experts.
        </Paragraph>
      </div>
    </div>
  );
};
