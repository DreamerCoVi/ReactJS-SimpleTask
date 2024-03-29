import React, {Component} from 'react';
import Loader from './Loader/Loader';
import './App.css';
import Table from './Table/Table';
import _ from 'lodash';
import DetailRowView from './DetailRowView/DetailRowView';
import ModeSelector from './ModeSelector/ModeSelector';
import ReactPaginate from 'react-paginate';
import TableSearch from './TableSearch/TableSearch';

class App extends Component {

  state = {
    isModeSelected: false,
    isLoading: false,
    data: [],
    sort: 'asc', // desc
    sortField: 'id',
    row: null,
    currentPage: 0,
    search: ''
  }

  async fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })
  }

  onSort = (sortField) => {
    const DataCopy = this.state.data.concat() // копирование стейта
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(DataCopy, sortField, sort)

    this.setState({
      data,
      sort,
      sortField
    })
  }

  onRowSelect = (row) => {
    this.setState({
      row
    })
  }

  onSelect = (url) => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    })

    this.fetchData(url);
  }

  pageChangeHandler = ({selected}) => {
    this.setState({
      currentPage: selected
    })
  }

  searchHandler = (search) => {
    this.setState({
      search,
      currentPage: 0
    })
  }

  getFilteredData(){
    const {data,search} = this.state;

    if(!search){
      return data
    }
    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
          || item['lastName'].toLowerCase().includes(search.toLowerCase())
          || item['email'].toLowerCase().includes(search.toLowerCase())
          || item['phone'].includes(search)
    })
  }



  render() {
    const filteredData = this.getFilteredData();
    const pageSize = 50;
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
    const pageCount = Math.ceil(filteredData.length / pageSize);


    if(!this.state.isModeSelected){
      return(
        <div className='container'>
          <ModeSelector onSelect={this.onSelect}/>
        </div>
      )
    }

    


    return (
      <div className="container">
          {this.state.isLoading 
          ?<Loader />
          :<>
            <TableSearch onSearch = {this.searchHandler}/>
            <Table data={displayData} onSort={this.onSort}
                  sort={this.state.sort} sortField={this.state.sortField}
                  onRowSelect = {this.onRowSelect}/> 
           </>
          }

          {this.state.data.length > pageSize &&
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName="page-item"
              pageLinkClassName='page-link'
              previousClassName='page-item'
              nextClassName='page-item'
              previousLinkClassName='page-link'
              nextLinkClassName='page-link'
              force={this.state.currentPage}
            />
          
          }

          {
            this.state.row
              ? <DetailRowView  person = {this.state.row}/>
              : null
          }
      </div>
    );
  }


}

export default App;
