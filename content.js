setInterval(async () => {
    (async () => {
      // Only proceed if on the feedback listing page
      if (window.location.href.includes("/student/qa/feedback")) {
          const surveys = document.querySelectorAll(".classCards li");
          let clicked = false;
          surveys.forEach(card => {
              if (!clicked && card.textContent.includes("Not Submitted")) {
                  const parent = card.closest(".classCards");
                  if (parent) {
                      const link = parent.querySelector("a[href*='/survey/']");
                      if (link && link.href.startsWith("https://qalam.nust.edu.pk/survey/")) {
                          link.click();
                          console.log("Clicked a Not Submitted survey link.");
                          clicked = true;
                      }
                  }
              }
          });
          // If no unsubmitted survey found, redirect to dashboard
          if (!clicked) {
              window.location.href = "https://qalam.nust.edu.pk/student/dashboard";
              console.log("No unsubmitted surveys. Redirected to dashboard.");
          }
          return;
      }
  
      // Wait for survey page to load
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      // 1. Click the "Start Survey" button
      const startButton = document.querySelector('button[type="submit"][value="start"]');
      if (startButton) {
          startButton.click();
          console.log("Start Survey button clicked.");
          await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
          console.error("Start Survey button not found.");
      }
  
      // 2. Select the 2nd option in each row across all survey tables
      document.querySelectorAll('table').forEach(table => {
          // only survey tables containing radio inputs
          if (table.querySelector('input.o_survey_form_choice_item')) {
              table.querySelectorAll('tbody tr').forEach(tr => {
                  const options = tr.querySelectorAll('td input[type="radio"]');
                  const secondOption = options[1];
                  if (secondOption) {
                      secondOption.click();
                      console.log(`Selected 2nd option for question ${tr.id}`);
                  } else {
                      console.error(`2nd option not found for row ${tr.id}`);
                  }
              });
          }
      });
      // 2. Select the 2nd option in each row across all survey tables
      document.querySelectorAll('table').forEach(table => {
        // only survey tables containing radio inputs
        if (table.querySelector('input.o_survey_form_choice_item')) {
            table.querySelectorAll('tbody tr').forEach(tr => {
                const options = tr.querySelectorAll('td input[type="radio"]');
                const secondOption = options[1];
                if (secondOption) {
                    secondOption.click();
                    console.log(`Selected 2nd option for question ${tr.id}`);
                } else {
                    console.error(`2nd option not found for row ${tr.id}`);
                }
            });
        }
    });
  
      // 3. Enter "Ok" into the text box
      const textarea = document.querySelector('textarea.form-control.o_survey_question_text_box');
      if (textarea) {
          textarea.value = "Ok";
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          console.log("Entered 'Ok' in the text box.");
      } else {
          console.error("Text area not found.");
      }
  
      // 4. Click the "Submit" button
      const submitButton = document.querySelector('button[type="submit"][value="finish"]');
      if (submitButton) {
          submitButton.click();
          console.log("Submit button clicked.");
  
          // 5. After 2 seconds, navigate directly to the feedback listing page
          setTimeout(() => {
              window.location.href = "https://qalam.nust.edu.pk/student/qa/feedback";
              console.log("Navigated to feedback page.");
          }, 2000); // wait 2 seconds after submit
      } else {
          console.error("Submit button not found.");
      }
    })();
  }, 2000); // check every 5 seconds
  