import React, { useState } from "react";
import { Rate, Typography, Result } from "antd";
import { InProgressIcon } from "../../../../../../../../../assets/svgComponent/InProgress";
import { useMutation } from "@apollo/client";
import { UPDATE_TRACK } from "../../../../../../../../../graphql/mutation/updateTrack/updateTrackMutation";
import {
  UpdateTrack as UpdateTrackData,
  UpdateTrackVariables,
} from "../../../../../../../../../graphql/mutation/updateTrack/__generated__/UpdateTrack";
import { TRACKS_QUERY } from "../../../../../../../../../graphql/query/tracks/tracksQuery";

const desc = [
  "novice",
  "advanced beginner",
  "competent",
  "proficient",
  "expert",
];

interface Props {
  ratings: number | undefined;
  trackName: string | undefined;
  currentTrackId: string | undefined;
}

const { Title } = Typography;
export const RateTrack = ({ ratings, trackName, currentTrackId }: Props) => {
  const [rate, setRate] = useState(ratings);
  const [updateTrack] = useMutation<UpdateTrackData, UpdateTrackVariables>(
    UPDATE_TRACK,
    {
      onError: () => {
        setRate(ratings);
      },
    }
  );
  const rateHandler = (value: number) => {
    if (currentTrackId) {
      updateTrack({
        variables: { input: { ratings: value, id: currentTrackId } },
        refetchQueries: [{ query: TRACKS_QUERY }],
      });
      setRate(value);
    }
  };

  return (
    <div className="modal__items-container">
      <Title
        level={4}
      >{`How comfortable do you feel about the Topic ${trackName}?`}</Title>
      <div className="ratings__container">
        <Rate
          style={{ fontSize: "3em" }}
          tooltips={desc}
          onChange={rateHandler}
          value={rate}
        />
      </div>
      {rate && rate === 5 ? (
        <Result
          status="success"
          title="Congratulation on Becoming an expert on this Topic!"
          subTitle="Denisc Waitley - Never become so much of an expert that you stop gaining expertise. View life as a continuous learning experience.    
        "
        />
      ) : (
        <>
          <Result
            icon={<InProgressIcon height={100} width={200} />}
            title="Every great story happened when someone decided not to give up."
            subTitle="Press forward. Do not stop, do not linger in your journey, but strive for the mark set before you"
          />
        </>
      )}
    </div>
  );
};
