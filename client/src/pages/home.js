import React, { Component } from "react";
// import PropTypes from "prop-types";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


// // REDUX
// import { connect } from "react-redux";

// // COMPONENTS
// import Chat from "../Components/chatbot/Chat";



class home extends Component {

    render() {

        return (
            <Grid container spacing={2}>
                <Grid item xs={1} sm={2} />
                <Grid item xs={10} sm={8}>
                    <div className="home-container">
                        <h2 className="question">What exactly <span className="emphasis">is</span> theozproject?</h2>
                        <p>In order to answer this question, we should first take a step back and ask the following:</p>
                        <p className="strong">Do you want more from your life?</p>
                        <p>Increased productivity? What about better health?</p>
                        <p>How would you feel if I told you that practicing one thing could help you in all of these areas and more?</p>
                        <h2 className="definition">gratitude <span className="noun">noun</span></h2>
                        <p className="pronounciation">grat•i•tude grăt′ĭ-too͞d″, -tyoo͞d″</p>
                        <p>Definition of <span className="emphasis">gratitude:</span>
                            <ul>
                                <li>The state of being grateful; thankfulness.</li>
                                <li>The state or quality of being grateful or thankful; a warm and friendly feeling in response to a favor or favors received; thankfulness.</li>
                            </ul>
                        </p>
                        <p><span className="strong">Gratitude is simply taking the time to think of all the positive things in your life - no matter how small - </span>rather than stewing on the negatives. This does not necessarily mean specifically telling someone that you are thankful for the things they have done (but this <span className="emphasis">can</span> help.)</p>
                        <p>Gratitude may actually be one of the most overlooked tools for increasing a person's happiness. In fact, many research studies have shown that it is the single most powerful method of increasing one's happiness.</p>
                        <p>Practicing gratitude doesn't cost any money and doesn't take much time - you only need a pen, a piece of paper and 5 minutes. <span className="strong">But the benefits of gratitude are immeasurable.</span> Studies reveal that gratitude can help improve on the following five aspects of our lives:</p>
                        <p>Our emotions, personality, social dynamics, career success, and even our health.</p>
                        <h2 className="question">Practicing gratitude and theozproject</h2>
                        <p>Back in December of 2019, the Youtube channel Kurzgesagt made an amazing video that detailed the benefits of practicing gratitude, entitled "An Antidote to Dissatisfaction". This video was the inspiration behind theozproject as I wanted a way to keep track of my own gratitude entries for future reflection.</p>
                        <p>Since starting my own gratitude journal, I've noticed a considerable improvement on my own mental wellbeing and hope that this application can help those that are also curious as to how gratitude can improve their lives.</p>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2} />
            </Grid>
        )
    }

}

export default home;