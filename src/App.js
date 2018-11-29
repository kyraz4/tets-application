import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



const lightDataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const hardDataUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
export default class App extends React.Component {
 state = {
  chooseData: false,
  data: null,
  additionalData : null,
  dataSortedRise: false,
  loading: false,
  firstNameSortedRise: true,
  lastNameSortedRise: true,
  emailSortedRise: true,
  phoneSortedRise: true,
  text: '',
  wasSearched: {
    searched: false,
    result: null,
  },
  addUserInfo: null,
}
    
 

    onLightDataChoose = () => {
         const load = this.state.loading;
         this.setState({loading:!load});
         const choose = this.state.chooseData;
           this.setState({
             chooseData: !choose,
           });
           axios.get(lightDataUrl).then(res => {
             this.setState({data: res.data.sort((a,b) => a.id - b.id),
            additionalData: res.data.sort((a,b) => a.id - b.id),
            });
            }).then(() => {
              const loading = this.state.loading;
              this.setState({loading: !loading});
            }).catch(err => console.log('error'));
    }

    onHardDataChoose = () => {
      const load = this.state.loading;
      this.setState({loading:!load});
      const choose = this.state.chooseData;
      this.setState({
        chooseData: !choose,
      });
      axios.get(hardDataUrl).then(res => {
        this.setState({data: res.data.sort((a,b) => a.id - b.id)});
      }).then(() => {
        const loading = this.state.loading;
        this.setState({loading: !loading});
      }).catch(err => console.log('error'));
    }

    onButtonSortClick = () => {
      const sortRise = this.state.dataSortedRise;
      const sortData = this.state.data.sort((a,b) => {
        return sortRise ? a.id - b.id : b.id - a.id;
      });
      this.setState({
        data: sortData,
        dataSortedRise: !sortRise,
        firstNameSortedRise: sortRise,
        lastNameSortedRise: sortRise,
        emailSortedRise: sortRise,
        phoneSortedRise: sortRise,
       });
    };

    onFirstNameSortClick = () => {
      const sortFirstName = this.state.firstNameSortedRise; 
      const sortData = sortFirstName ? this.state.data.sort((a,b) => (a.firstName < b.firstName) ? 1 : ((b.firstName < a.firstName) ? -1 : 0)):
       this.state.data.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
     this.setState({
      data: sortData,
      dataSortedRise: sortFirstName,
      firstNameSortedRise: !sortFirstName,
      lastNameSortedRise: sortFirstName,
      emailSortedRise: sortFirstName,
      phoneSortedRise: sortFirstName,
       });     
    }

    onLastNameSortClick = () => {
      const sortLastName = this.state.lastNameSortedRise; 
      const sortData = sortLastName ? this.state.data.sort((a,b) => (a.lastName < b.lastName) ? 1 : ((b.lastName < a.lastName) ? -1 : 0)):
       this.state.data.sort((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0));
     this.setState({
      data: sortData,
      dataSortedRise: sortLastName,
      firstNameSortedRise: sortLastName,
      lastNameSortedRise: !sortLastName,
      emailSortedRise: sortLastName,
      phoneSortedRise: sortLastName,
       });     
    }

    onEmailSortClick = () => {
      const sortEmail = this.state.emailSortedRise; 
      const sortData = sortEmail ? this.state.data.sort((a,b) => (a.email < b.email) ? 1 : ((b.email < a.email) ? -1 : 0)):
       this.state.data.sort((a,b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0));
     this.setState({
      data: sortData,
      dataSortedRise: sortEmail,
      firstNameSortedRise: sortEmail,
      lastNameSortedRise: sortEmail,
      emailSortedRise: !sortEmail,
      phoneSortedRise: sortEmail,
       });     
    }

    onPhoneSortClick = () => {
      const sortPhone = this.state.phoneSortedRise; 
      const sortData = sortPhone ? this.state.data.sort((a,b) => (a.phone < b.phone) ? 1 : ((b.phone < a.phone) ? -1 : 0)):
       this.state.data.sort((a,b) => (a.phone > b.phone) ? 1 : ((b.phone > a.phone) ? -1 : 0));
     this.setState({
      data: sortData,
      dataSortedRise: sortPhone,
      firstNameSortedRise: sortPhone,
      lastNameSortedRise: sortPhone,
      emailSortedRise: sortPhone,
      phoneSortedRise: !sortPhone,
       });     
    }

    onInputChange = (e) => {
      this.setState({ text: e.target.value });
    }

    onButtonSearhClick = () => {
      const searched = this.state.wasSearched.searched;
      const addData = this.state.additionalData;
      const filteredData = this.state.data.filter((el) => el.firstName === this.state.text);
      this.setState({data: searched ? addData : filteredData,
      text : '',
      wasSearched: {
        searched : true,
        result: filteredData,
      },
    });
    }

    onButtonBackClick = () => {
      const addData = this.state.additionalData;
      this.setState({data: addData,
        wasSearched: {
          searched: false,
          result: null,
        },
      });
    }

    render() {
      const load = this.state.loading;
      const dataDone = this.state.data;
      const sortRise = this.state.dataSortedRise;
      const firstNameSort = this.state.firstNameSortedRise;
      const lastNameSort = this.state.lastNameSortedRise;
      const emailSort = this.state.emailSortedRise;
      const phoneSort = this.state.phoneSortedRise;
      const search = this.state.wasSearched;
      return <div>
        {!dataDone ? <div className = 'btn-container'>
          <button onClick = {this.onLightDataChoose} disabled = {load? true : false}>Загрузим легкие данные?</button>
          <button onClick = {this.onHardDataChoose} disabled = {load? true : false}>Загрузим тяжелые данные?</button>
        </div> : null}
        {load ? <div>Загружаем контент...</div>: null}
        {dataDone ? <div>
          <div>
            <p>Поиск по имени</p>
          <input type ='text' onChange = {this.onInputChange} value = {this.state.text}></input>
          <button onClick = {this.onButtonSearhClick}>Найти</button>
          </div>
          
          <table>
            <tr>
              <th><div>id</div><button onClick = {this.onButtonSortClick}>{!sortRise ? 'increase' : 'decrease'} </button></th>
              <th><div>firstName</div><button onClick = {this.onFirstNameSortClick}>{!firstNameSort ? 'increase' : 'decrease'}</button></th>
              <th><div>lastName</div><button onClick = {this.onLastNameSortClick}>{!lastNameSort ? 'increase' : 'decrease'}</button></th>
              <th><div>email</div><button onClick = {this.onEmailSortClick}>{!emailSort ? 'increase' : 'decrease'}</button></th>
              <th><div>phone</div><button onClick = {this.onPhoneSortClick}>{!phoneSort ? 'increase' : 'decrease'}</button></th>
          </tr>
          {this.state.data.map(i =><Item value={i}/>)}
        </table>
        {search.searched ?
          search.result.length !== 0 ? <div>
          <div>
          {this.state.data.map(i => <SedrcedItem value={i}/>)}
          <button onClick = {this.onButtonBackClick}>Назад к списку</button>
          </div>
        </div>  : <div>
          <p>По вашему запросу ничего не было найдено</p>
          <button onClick = {this.onButtonBackClick}>Назад к списку</button>
          </div>
          : null}
        </div> : null}
      </div>;
    }
  };

  class Item extends React.Component {
    state = {
      value: this.props.value,
      addData: {
        added: false,
        info: this.props.value
      }
    }

    render() {
      return  <tr><th>{this.props.value.id}</th>
      <th>{this.props.value.firstName}</th>
      <th>{this.props.value.lastName}</th>
      <th>{this.props.value.email}</th>
      <th>{this.props.value.phone}</th>
      </tr>
    }
  }

  class SedrcedItem extends React.Component {
    render() {
        return <div>
        <p>Additional data about {this.props.value.firstName + ' ' + this.props.value.lastName}</p>
        <ul>
          <li>city - {this.props.value.address.city}</li>
          <li>street - {this.props.value.address.streetAddress}</li>
          <li>state - {this.props.value.address.state}</li>
          <li>zip - {this.props.value.address.zip}</li>
        </ul>
        <p>Description</p>
        <p>{this.props.value.description}</p>
      </div>;
    }
  } 

  const mountNode = document.getElementById('root');
  ReactDOM.render(<App />, mountNode);