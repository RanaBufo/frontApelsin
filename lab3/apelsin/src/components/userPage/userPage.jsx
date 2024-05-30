import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let refreshToken = sessionStorage.getItem("refreshToken");
  let role = sessionStorage.getItem("role");

  function saveToken(token, id, imgUser) {
    sessionStorage.setItem("refreshToken", token);
    sessionStorage.setItem("idUser", id);
    sessionStorage.setItem("imgUser", imgUser);
  }

  function saveRole(role) {
    sessionStorage.setItem("role", role);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {};
        const url = `https://localhost:7097/api/Registration/GetAccessToken?minutes=2`;
        const headers = {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${refreshToken}`,
        };

        const tokenResponse = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: headers,
        });
        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          throw new Error(errorText);
        }
        const token = await tokenResponse.text();
        const userResponse = await fetch(`https://localhost:7097/User/OneUserGet`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(errorText);
        }
        const userData = await userResponse.json();
        setItems(userData);
        setLoading(true);
      } catch (error) {
        console.error("Ошибка:", error);
        navigate("/"); // Вернуться на главную страницу при ошибке
      }
    };

    fetchData();
  }, [navigate, refreshToken]);

  let imgData = items.ImgName || "cat.png";

  const exitButton = () => {
    saveToken(null, null, null);
    navigate("/");
  };

  const addProductButton = () => {
    navigate("/addProduct");
  };

  return loading ? (
    <main>
      
      <div className="userCard">
        <div className="centerElement">
          <div className="squer">
            <div className="imgCircle">
              <img
                src={`https://localhost:7073/img/${imgData}`}
                alt={imgData ? "Item Image" : "Default Image"}
                className="imgCircle"
              />
            </div>
          </div>
        </div>
        <div className="rowInfo">
          <p className="pClass">{items.firstName}</p>
          <p className="pClass">{items.patronymic}</p>
          <p className="pClass">{items.lastName}</p>
        </div>
        
        <div className="row">
          <button onClick={exitButton}>
            Выйти
          </button>
          
        </div>
      </div>
    </main>
  ) : (
    <p>Loading...</p>
  );
}

export default UserPage;
