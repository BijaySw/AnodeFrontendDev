import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './PriceList.css';
import './Exchages.css';




export default function L2Book() {


  return (
      <div>
        <div class="d-grid gap-2 Margintop">
            <button type="button" class="btn btn-dark btn-sm">SELECT EXCHANGES</button>
        </div>
        <div class="form-check texts">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
            <label class="form-check-label" for="defaultCheck1">
            BINANCE
            </label>
        </div>
        <div class="form-check texts">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
            <label class="form-check-label" for="defaultCheck2">
                COINBASE
            </label>
        </div>

      </div>
  );
}
