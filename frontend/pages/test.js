import axios from "axios";
import { useRouter } from "next/router";

const tempData = {
  signUpCheckValue: true,
};
const Test = () => {
  
      

  // 정리하면,
  /*

    1. get - post
    2. header에 content/type -> application/json
    
  */
  const router = useRouter();
  axios
  .get("http://localhost:8080/test", {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Accept': '*/*',
      'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWJiY2NAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0NjAzMDUzMSwiZXhwIjoxNjQ2MDMyMzMxfQ.aHoNnDVMjFMs3IaYUULkSEcqspFPZRjW40pWW13PAXA'
    
    },
    params: {
      userEmail: "asdfa@gmail.com",
      userName: "홍길동",
      provider: "google",
    },
  })
    .then((res) => {
      console.log(res);
      // 성공적으로 true 값을 받는다면
      if (res.data.signUpCheckValue == 'false') {
        console.log('iiiiffff')

        router.push("/aa");

        console.log('iiiiffff22222222222222222222')
      }
      console.log('ifif222')

    });

  return <h1>Test</h1>;
};

export default Test;