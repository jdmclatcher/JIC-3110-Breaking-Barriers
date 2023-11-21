const asyncHandler = require("express-async-handler");
const { db } = require("../configs/config");

// Instructor Create Quiz
exports.quiz_create_post = asyncHandler(async (req, res, next) => {
    try {
        const { instructor_id, quiz_title, quiz_description, quiz_questions } = req.body;
        const { data, error } = await db.rpc('f_create_quiz', {
          p_instructor_per_id: instructor_id,
          p_title: quiz_title,
          p_description: quiz_description,
          p_questions: JSON.stringify(quiz_questions),
        });
    
        if (error) {
          console.error('Error creating quiz:', error.message);
          return { success: false, message: 'Failed to create quiz' };
        } else {
          return { success: true, message: `${quiz_title} successfully created` };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
});

// Instructor Edit Quiz
exports.quiz_edit_patch = asyncHandler(async (req, res, next) => {
    try {
        const { quiz_id, quiz_title, quiz_description, quiz_questions } = req.body;
        const { data, error } = await db.rpc('f_edit_quiz', {
          p_quiz_id: quiz_id,
          p_title : quiz_title,
          p_description : quiz_description,
          p_questions: JSON.stringify(quiz_questions),
        });
    
        if (error) {
          console.error('Error editing quiz:', error.message);
          return { success: false, message: 'Failed to edit quiz' };
        } else {
          return { success: true, message: `${quiz_title} successfully edited` };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    });

// Get Trainee Quizzes
exports.quiz_trainee_get = asyncHandler(async (req, res, next) => {
    try {
        const { trainee_id } = req.query;
        const { data, error } = await db
            .from('view_quizzes_for_trainee')
            .select('*')
            .eq('trainee_per_id', trainee_id);
    
        if (error) {
          console.error('Failed to fetch quizzes:', error.message);
          return { success: false, message: 'Failed to fetch quizzes' };
        } else {
          return { success: true, quizList: data };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

// Get Quiz details
exports.quiz_get = asyncHandler(async (req, res, next) => {
    try {
        const { quiz_id } = req.query;
        const { data, error } = await db
          .from('quizzes')
          .select('*')
          .eq('quiz_id', quiz_id)
          .single();
    
        if (error) {
          console.error('Failed to fetch questions:', error.message);
          return { success: false, message: 'Failed to fetch questions' };
        } else {
          return { success: true, quizData: data };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

// Get questions for quiz
exports.quiz_questions_get = asyncHandler(async (req, res, next) => {
    try {
        const { quiz_id } = req.query;
        const { data, error } = await db
          .from('view_questions_and_options_for_quiz')
          .select('*')
          .eq('quiz_id', quiz_id);
    
        if (error) {
          console.error('Failed to fetch questions:', error.message);
          return { success: false, message: 'Failed to fetch questions' };
        } else {
          const questionsData = {};
          data.forEach((q) => {
            if (!questionsData.hasOwnProperty(q.question_id)) {
              questionsData[q.question_id] = {
                question_id: q.question_id,
                question_text: q.question_text,
                question_type: q.question_type,
                options: [],
              };
            }
            questionsData[q.question_id].options.push({
              option_id: q.option_id,
              option_text: q.option_text,
            });
          });
          return { success: true, questionList: Object.values(questionsData) };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

// Trainee Submit Quiz
exports.quiz_submit_post = asyncHandler(async (req, res, next) => {
    try {
        const { trainee_id, quiz_id, question_responses } = req.body;
        const { data, error } = await db.rpc('f_submit_quiz', {
          i_trainee_id: trainee_id,
          i_quiz_id: quiz_id,
          i_question_responses_json: JSON.stringify(question_responses),
        });
    
        if (error) {
          console.error('Failed to submit quiz:', error.message);
          return { success: false, message: 'Failed to submit quiz' };
        } else {
          return { success: true, message: 'Quiz successfully submitted' };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);
