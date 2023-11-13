import React from 'react'
import fill1 from '../../assets/imgs/pexels-andrea-piacquadio-3844533.jpg'
import fill2 from '../../assets/imgs/pexels-pixabay-269077.jpg'
import fill3 from '../../assets/imgs/pexels-startup-stock-photos-7070.jpg'
import fill4 from '../../assets/imgs/pexels-ylanite-koppens-796602.jpg'
import fill5 from '../../assets/imgs/pexels-photomix-company-518244.jpg'

const About = () => {
  return (
    <div className='bg-light-grey px-4 py-2 md:px-16 lg:px-32 xl:px-64'>
      <div className='w-full h-1/2 md:inline lg:flex xl:flex'>
        <div className='w-full text-center mt-1 md:px-0 lg:px-5 xl:px-8'>
          <h1 className='font-bold md:text-xl lg:text-2xl xl:text-3xl'>Välkommen till vårt Airbnb-företag!</h1>
          <p className='mt-2 mb-2 sm:text-sm md:text-md xl:text-lg'>
          Vi är inte bara en plats att bo på, utan en upplevelse, en väg till att utforska
           och känna sig som hemma, var du än är i världen. Hos oss handlar det om mer än 
           bara boende; det handlar om att skapa minnen och dela ögonblick tillsammans.
          Vår passion för gästfrihet är djupt rotad och sträcker sig långt bortom de vanliga 
          gränserna. Vi strävar efter att erbjuda dig det bästa, det mest bekväma och det mest 
          minnesvärda boendet varje gång du väljer att stanna hos oss. Vårt dedikerade team av värdar 
          och experter är här för att göra din vistelse så smidig och trevlig som möjligt.
          Oavsett om du reser i affärer eller nöje, ensam eller med familj och vänner, är 
          vi här för att göra din resa oförglömlig. Våra boenden är handplockade för att säkerställa
           högsta kvalitet och komfort, och vi strävar alltid efter att överträffa dina förväntningar.
          Välkommen till vårt Airbnb-hem, där varje dörröppning är en möjlighet till äventyr och varje 
          vistelse är en chans att känna sig som hemma.</p>
        </div>
        <div className='flex w-full p-2'>
          <div className='w-full'>
            <img alt='' src={fill1} className='object-cover h-1/2 w-full'></img>
            <img alt='' src={fill2} className='object-cover h-1/2 w-full'></img>
          </div>

          <div className='w-full'>
            <img alt='' src={fill3} className='object-cover h-1/2 w-full'></img>
            <img alt='' src={fill4} className='object-cover h-1/2 w-full'></img>
          </div>
          
        </div>
      </div>
      <div className='md:inline lg:flex xl:flex w-full h-1/2'>

        <div className='w-full h-full p-2'>
          <img alt='' src={fill5} className='object-cover h-full w-full'></img>
        </div>

        <div className=' w-full px-8 text-center'>
            <h1 className='font-bold mt-1 font-bold md:text-xl lg:text-2xl xl:text-3xl'>Utforska Världen, Skapa Minnen</h1>
            <p className='mt-2 mb-2 sm:text-sm md:text-md xl:text-lg'>I hjärtat av vår verksamhet finns en enkel filosofi: 
            att skapa en värld där resande inte bara hittar ett tak över huvudet, utan också en plats
            där drömmar tar fart. Vårt Airbnb-företag är en sammansmältning av kulturer, smaker och berättelser.
            Det är en plats där du inte bara reser till en destination, utan snarare in i en rik värld av möjligheter 
            och upplevelser.Våra boenden är som sagolika kapitel, var och en unik och berättande på sitt sätt.
            Från pittoreska stugor inbäddade i tysta skogar till lyxiga loft med panoramautsikt över stadens
            skyline - varje boende är noggrant utvalt för att erbjuda en extraordinär vistelse. Och bakom varje 
            dörr finns en historia värd att berätta, en lokal historia som blir din när du korsar tröskeln.
            Men vårt Airbnb-företag handlar inte bara om platser att bo på. Det handlar om de människor du möter,
             de leenden du delar och de samtal som fördjupar dina resor. Våra värdar är inte bara det - de är guider
              och vänner, redo att dela med sig av sina.</p>
        </div>
      </div>
    </div>
  )
}

export default About