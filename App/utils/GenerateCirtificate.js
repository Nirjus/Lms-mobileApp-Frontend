export const pdfTemplate = (
  name,
  courseName,
  completeDate,
  author,
  totalTime,
  category
) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Completion Certificate</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .certificate {
      max-width: 800px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .certificate-header {
      text-align: center;
      margin-bottom: 30px;
    }
    .certificate-header img {
      max-width: 200px;
      margin-bottom: 20px;
    }
    .certificate-header .titleLogo {
      color: #6857E8;
      font-size: 40px;     
      font-weight: bold;
  }
    .certificate-header h1 {
      margin: 0;
      font-size: 32px;
      color: #333;
    }
    .certificate-body {
      text-align: left;
      margin-bottom: 30px;
      padding: 10px;
    }
    .certificate-text {
      font-size: 15px;
      color: #555;
      margin-bottom: 15px;
      text-align: justify;
    }
    .signature {
      text-align: center;
    }
    .signature img {
      max-width: 150px;
      margin-top: 20px;
    }
    .signature p {
      margin: 0;
      font-size: 16px;
      color: #777;
    }
    .footer {
      text-align: center;
      margin-top: 50px;
      font-size: 14px;
      color: #777;
    }
     .certificate-header .logowithheading{
        display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    align-items: center;
      }
      .certificate-header .logostyle {
        width: 50px,
        height: 50px,
         object-fit: contain;
      }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="certificate-header">
      <div class="logowithheading">
      <img src="https://res.cloudinary.com/dux3nrcwg/image/upload/v1718177083/adaptive-icon_gfvetr.png" alt="logo" class="logostyle" />
        <h1 class="titleLogo">E Learner</h1>
        </div>
      <div>
      <h1>Certificate of Completion</h1>
    </div>
    <div class="certificate-body">
      <p class="certificate-text">This is to certify that <strong>${name}</strong> has successfully completed the course <strong>"${courseName}"</strong>.</p>
      <p class="certificate-text">Duration of Course: <strong>${totalTime}</strong></p>
      <p class="certificate-text">Date of Completion: <strong>${completeDate}</strong></p>
      <p class="certificate-text">Throughout the duration of the course, ${name} has demonstrated exceptional dedication, perseverance, and enthusiasm in mastering the concepts and techniques of ${courseName} course.</p>
      <p class="certificate-text">${name} consistently engaged in all course activities, including lectures, assignments, and projects, with a high level of commitment and professionalism.</p>
      <p class="certificate-text">His/Her ability to grasp complex concepts quickly and apply them in practical scenarios is commendable, reflecting his deep understanding of the subject matter.</p>
      <p class="certificate-text">${name}'s participation and contributions have greatly enriched the learning experience of his peers, fostering a collaborative and supportive learning environment.</p>
      <p class="certificate-text">With his successful completion of the course, ${name} has demonstrated his readiness to embark on new challenges and opportunities in the field of ${category}.</p>
    </div>
    <div class="signature">
      <p>${author}</p>
      <p>Course Instructor</p>
    </div>
    <div class="footer">
    <p>For inquiries, please contact us at:</p>
    <p>Email: karmakarnirjus4839@gmail.com | Phone: +123 456 7890</p>
  </div>
  </div>
</body>
</html>

`;
  return html;
};
