import React , { Component } from 'react';
import Card from './Card.component';
import './shoppingcomponent.css';
import logo from './onlineshopping.png';


class OnlineShopping extends Component{
    constructor (props){
        super(props);
        this.state={
            apidata: {},
            productCategories: [],
            textSearch: '',
            selectedOption: ''
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = async() => {
        try {
            let response = await fetch('https://dummyjson.com/products');
            let apidata = await response.json();

            let categories = await fetch('https://dummyjson.com/products/categories');
            let  productCategories= await categories.json();

            this.setState({apidata , productCategories})

            
          } catch(err) {
            alert(err);
          }
    }


    handleSearchChange = (e) => {
        this.setState({
            textSearch: e.target.value
        })
    }

    handleFindClick = async() => {
        try {
            let response = await fetch(`https://dummyjson.com/products/search?q=${this.state.textSearch}`);
            let apidata = await response.json();

            this.setState({apidata})
          } catch(err) {
            alert(err);
          }
    }

    handleOptionChange = async (event) => {
        const selectedValue = event.target.value;
        this.setState({ selectedOption: selectedValue });
        
        if(selectedValue != ""){
        try {
          const response = await fetch(`https://dummyjson.com/products/category/${selectedValue}`);
          const responseData = await response.json();
          this.setState({
            apidata: responseData
          })
        } catch (error) {
          console.error('Error making API call:', error);
        }
      } else {
        try {
            const response = await fetch(`https://dummyjson.com/products`);
            const responseData = await response.json();
            this.setState({
              apidata: responseData
            })
          } catch (error) {
            console.error('Error making API call:', error);
          }
      }}

    render() {
        return (
          
        <div className="container">
        <header>
          <div className="row align-items-center">
            <div className="col-md-2">
              <img src={logo} alt="Company Logo" className='logostyle'/>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search products"
                onChange={this.handleSearchChange}
              />
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-primary"
                onClick={this.handleFindClick}
              >
                Find
              </button>
            </div>
          </div>
          
        </header>

        <div className="custom-dropdown">
        <select value={this.state.selectedOption} onChange={this.handleOptionChange} className="custom-select" name="category-dropdown">
        <option value="">Choose a Category</option>
        {(this.state.productCategories && this.state.productCategories.length > 0) &&  this.state.productCategories.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      </div>
            {(this.state.apidata && this.state.apidata.products && this.state.apidata.products.length > 0) && (
            <div className="row">
                {this.state.apidata.products.map((product, index) => (
                <div key={index} className="col-md-3">
                    <Card item={product} className="card" />
                </div>
                ))}
            </div>
            )}

        <footer>
          <p>&copy; 2023 Online Shopping App</p>
        </footer>
      </div>
        )
      }
}
      
      
  

export default OnlineShopping;