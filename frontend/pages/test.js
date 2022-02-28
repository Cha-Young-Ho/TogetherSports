import { useRouter } from "next/router";
import axios from "axios";
const Test = () => {
    const headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWJiY2NAZ21haWwuY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0NjAzMDUzMSwiZXhwIjoxNjQ2MDMyMzMxfQ.aHoNnDVMjFMs3IaYUULkSEcqspFPZRjW40pWW13PAXA'
      }
    const router = useRouter();
    axios
      .post("http://localhost:8080/test", {
        params: {
          
            "email" : "aabbcc@gmail.com"
            
        }
      }, headers)
      .then((res) => {
        // 성공적으로 true 값을 받는다면
        console.log(res.data);
       
        router.replace("/");
      })
      .catch((error) => {
        // 없는 정보 입력 시
        console.log(error);
        router.replace("/xxx");
      });
  
    return <h1>Test</h1>;
  };
  
  export default Test;