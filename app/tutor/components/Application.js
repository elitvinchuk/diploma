import React from 'react'

const Application = () => (
  <>
    <h1>
      Проектирование автоматизированных систем<br />
      <small className="text-muted">Иван Петров (гр. 321432)</small>
    </h1>

    <dl className="row">
      <dt className="col-sm-3">Первичное обращение</dt>
      <dd className="col-sm-9">10 августа 2017</dd>

      <dt className="col-sm-3">Дата зачёта</dt>
      <dd className="col-sm-9">30 апреля 2018</dd>
    </dl>

    <div id="accordion">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              className="btn btn-link btn-block d-flex justify-content-between align-items-center collapsed"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Контрольная №1
              <span className="badge badge-success">
                Зачтено <span className="oi oi-check" />
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">
            <h2>Задание</h2>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
            <hr />
            <h2>Прикрепления</h2>
            <div className="card-columns">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className="oi oi-document" /> Отчёт
                  </h5>
                  <a href="#" className="card-link">
                    Скачать
                  </a>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className="oi oi-code" /> Исходники
                  </h5>
                  <p className="card-text">Выполнено в среде версии 5.10.15.</p>
                  <a href="#" className="card-link">
                    Скачать
                  </a>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className="oi oi-bar-chart" /> Расчёты
                  </h5>
                  <p className="card-text">
                    Расчёты выполены с погрешностью, но всё в порядке 😃
                  </p>
                  <a href="#" className="card-link">
                    Скачать
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <h2>Комментарии</h2>
            <blockquote className="blockquote">
              <p className="mb-0">
                Добрый день! Задание выполнено, проверьте, пожалуйста.
              </p>
              <footer className="blockquote-footer">
                Иван Петров час назад
              </footer>
            </blockquote>
            <blockquote className="blockquote text-right">
              <p className="mb-0">Да, всё верно. Контрольная зачтена.</p>
              <footer className="blockquote-footer">
                Преподаватель 10 минут назад
              </footer>
            </blockquote>
            <blockquote className="blockquote">
              <p className="mb-0">Спасибо!</p>
              <footer className="blockquote-footer">
                Иван Петров меньше минуты назад
              </footer>
            </blockquote>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Комментарий:</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              />
            </div>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-secondary">
                <span className="oi oi-thumb-down" /> На доработку
              </button>
              <button type="button" className="btn btn-success">
                <span className="oi oi-thumb-up" /> Зачтено
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button
              className="btn btn-link btn-block d-flex justify-content-between align-items-center collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Контрольная №2
              <span
                className="badge badge-warning"
                data-toggle="tooltip"
                data-placement="top"
                title="Зачтено"
              >
                На дороботку <span className="oi oi-pencil" />
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div className="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" id="headingThree">
          <h5 className="mb-0">
            <button
              className="btn btn-link btn-block d-flex justify-content-between align-items-center collapsed"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Индивидуальная №1
              <span
                className="badge badge-light"
                data-toggle="tooltip"
                data-placement="top"
                title="Зачтено"
              >
                Ожидает проверки <span className="oi oi-clock" />
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <div className="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </div>
        </div>
      </div>
    </div>

    <button type="button" className="btn btn-primary btn-lg float-right mt-3">
      <span className="oi oi-thumb-up" /> Допустить
    </button>
  </>
)

Application.propTypes = {}

export default Application
