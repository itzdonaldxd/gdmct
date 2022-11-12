var contentious_html = `<p>A city government is trying to decide whether to pass a law banning private citizens from carrying concealed handguns in public. Government officials are unsure whether the law will be more likely to decrease crime by reducing the number of people carrying weapons or increase crime by making it harder for law-abiding citizens to defend themselves from violent criminals.</p> 
 
<p>To address this question, researchers divided cities into two groups: one consisting of cities that had recently enacted bans on concealed weapons, and another that had no such bans. They then observed the number of cities that experienced decreases in crime and the number of cities that experienced increases in crime in the next year.</p>
 
<p>In each group, the number of cities that experienced a <u>decrease</u> in crime and the number of cities that experienced an <u>increase in crime</u> is recorded below. The total number of cities in each of the two groups is not exactly the same, but this does not prevent assessment of the results.</p>
 
<p>Please indicate whether the research shows that cities that enacted a ban on carrying concealed handguns were more likely to have a <u>decrease</u> or an <u>increase</u> in crime than cities without bans.</p>`;

var noncontentious_html = `<p>Medical researchers have developed a new cream for treating skin rashes. New treatments often work but sometimes make rashes worse. Even when treatments don't work, skin rashes sometimes get better and sometimes get worse on their own. As a result, it is necessary to test any new treatment in an experiment to see whether it makes the skin condition of those who use it better or worse than if they had not used it.</p>
 
<p>Researchers have conducted an experiment on patients with skin rashes. In the experiment, one group of patients used the new cream for two weeks, and a second group did not use the new cream.</p>
 
<p>In each group, the number of people whose skin condition got <u>better</u> and the number whose condition got <u>worse</u> are recorded in the table below. Because patients do not always complete studies, the total number of patients in each of the two groups is not exactly the same, but this does not prevent assessment of the results.</p>
 
<p>Please indicate whether the experiment shows that using the new cream is likely to make the skin condition <u>better</u> or <u>worse</u>.</p>`

export const taskData = {
      numeracy: {
        low: { a1r1: 31, a1r2: 10, a2r1: 15, a2r2: 3},
        med: { a1r1: 223, a1r2: 75, a2r1: 107, a2r2: 21},
        high: { a1r1: 1561, a1r2: 525, a2r1: 749, a2r2: 147},
      },
      stimuli:{
        contentious:{
            action1: "Cities that did ban carrying concealed handguns in public",
            action2: "Cities that did not ban carrying concealed handguns in public",
            result1: "Decrease in crime",
            result2: "Increase in crime",
            prompt: JSON.stringify(contentious_html),
            answerA: JSON.stringify("Cities that enacted a ban on carrying concealed handguns were more likely to have a <u>decrease</u> in crime than cities without bans."),
            answerB: JSON.stringify("Cities that enacted a ban on carrying concealed handguns were more likely to have an <u>increase</u> in crime than cities without bans.")
        },
        noncontentious:{
            action1: "Patients who did use the new skin cream",
            action2: "Patients who did not use the new skin cream",
            result1: "Rash Got Worse",
            result2: "Rash Got Better",
            prompt: JSON.stringify(noncontentious_html),
            answerA: JSON.stringify("People who used the skin cream were more likely to <u>get better</u> than those who didn't."),
            answerB: JSON.stringify("People who used the skin cream were more likely to <u>get worse</u> than those who didn't.")
        }

      }
    }



