import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  console.log( sessionStorage.getItem("refreshToken"))
  function saveToken(token, imgUser, idUser) {
    sessionStorage.setItem("refreshToken", token);
    sessionStorage.setItem("imgUser", imgUser);
    sessionStorage.setItem("idUser", idUser);
  }

  const onSubmit = (data) => {
    if (data.password !== data.doublePassword) {
      alert("Пароли не совпадают");
      return;
    }
  
    const body = {
      FirstName: data.name,
      LastName: data.surname,
      Patronymic: data.patronymic,
      Description: null,
      Birhday: data.dateBurn,
      Contact: {
        Email: data.email,
        Phone: data.number,
        Password: data.password,
        IdRole: 2,
      },
    };
  
    const url = 'https://localhost:7097/Login/Registration';
  
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8",
    };
  
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((response) => {
        // Пытаемся распарсить как JSON
        return response.text().then((text) => {
          try {
            return JSON.parse(text);
          } catch (error) {
            throw new Error(`Response is not valid JSON: ${text}`);
          }
        });
      })
      .then((token) => {
        saveToken(token.token, null, token.id);
        console.log(token.token);
        navigate("/user");
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };
  

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="block"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="in-block">
          <h1>Регистрация</h1>

          <div className="input-group">
            <label>Имя</label>
            <input
              type="text"
              {...register("name", { required: "Имя обязательно" })}
            />
            {errors.name && (
              <p className="errorMassage">{errors.name.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>Отчество</label>
            <input type="text" {...register("patronymic")} />
          </div>

          <div className="input-group">
            <label>Фамилия</label>
            <input
              type="text"
              {...register("surname", { required: "Фамилия обязательна" })}
            />
            {errors.surname && (
              <p className="errorMassage">{errors.surname.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>День рождения</label>
            <input
              type="date"
              {...register("dateBurn", {
                required: "Дата рождения обязательна",
              })}
            />
            {errors.dateBurn && (
              <p className="errorMassage">{errors.dateBurn.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>Номер телефона</label>
            <input
              type="text"
              {...register("number", { required: "Номер телефона обязателен" })}
            />
            {errors.number && (
              <p className="errorMassage">{errors.number.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input
              type="email"
              {...register("email", { required: "Email обязателен" })}
            />
            {errors.email && (
              <p className="errorMassage">{errors.email.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              {...register("password", { required: "Пароль обязателен" })}
            />
            {errors.password && (
              <p className="errorMassage">{errors.password.message}</p>
            )}
          </div>

          <div className="input-group">
            <label>Повторите пароль</label>
            <input
              type="password"
              {...register("doublePassword", {
                required: "Подтверждение пароля обязательно",
              })}
            />
            {errors.doublePassword && (
              <p className="errorMassage">{errors.doublePassword.message}</p>
            )}
          </div>

          <button type="submit">Регистрация</button>
          <a onClick={onLogin}>Войти</a>
        </div>
      </form>
    </>
  );
}

export default Registration;
