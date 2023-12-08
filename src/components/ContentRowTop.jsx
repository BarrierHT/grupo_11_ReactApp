import mandalorian from '../assets/images/mandalorian.jpg'
import DataContent from './DataContent';
import Genres from './Genres';



function ContentRowTop(){

    const dataBoxes = [
      {
        title: "Movies in Data Base",
        amount: 21,
        icon: 'fa-film',
        styles: ['border-left-primary' ,'text-primary']
      },
      {
        title: "Total awards",
        amount: 79,
        icon: 'fa-award',
        styles: [ 'border-left-success' ,'text-success']
      },
      {
        title: "Actors quantity",
        amount: 49,
        icon: 'fa-user',
        styles: ['border-left-warning', 'text-warning']
      }
    ]


    return(
        <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
        </div>
        {/* Content Row Movies*/}
        <div className="row">
          {/* Movies in Data Base */}
          {
            dataBoxes.map((dataBox, i) =>(
              <DataContent key={i} dataBox = {dataBox}/>
            ))
          }
        </div>
        {/* End movies in Data Base */}
        {/* Content Row Last Movie in Data Base */}

      </div>
    )
}

export default ContentRowTop;