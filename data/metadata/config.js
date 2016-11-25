var fieldToMatch = {
    "geometry" : "NEWCD2011",
    "csv": "Village.Code"
}


var districts = ['Pune', 'Satara','Kolhapur','Solapur','Sindhudurg','Thane','Latur','Hingoli','Aurangabad','Akola','Washim','Sangli','Dhule','Nandurbar','Jalgaon','Ahmadnagar','Bid','Buldana','Palghar','Raigad','Ratnagiri','Nashik','Jalna','Parbhani','Osmanabad','Nanded','Amravati','Bhandara','Chandrapur','Dhule','Gadchiroli','Gondiya','Mumbai_Sub','Nanded','Nagpur','Wardha','Yavatmal'];


var geojson_file_map = {
    "Nandurbar": "497_Nandurbar",
    "Dhule": "498_Dhule",
    "Jalgaon": "499_Jalgaon",
    "Buldana": "500_Buldana",
    "Akola": "501_Akola",
    "Washim": "502_Washim",
    "Amravati": "503_Amravati",
    "Wardha": "504_Wardha",
    "Nagpur": "505_Nagpur",
    "Bhandara": "506_Bhandara",
    "Gondia": "507_Gondia",
    "Gadchiroli": "508_Gadchiroli",
    "Chandrapur": "509_Chandrapur",
    "Yavatmal": "510_Yavatmal",
    "Nanded": "511_Nanded",
    "Hingoli": "512_Hingoli",
    "Parbhani": "513_Parbhani",
    "Jalna": "514_Jalna",
    "Aurangabad": "515_Aurangabad",
    "Nasik": "516_Nasik",
    "Thane": "517_Thane",
    "Raigad": "520_Raigad",
    "Pune": "521_Pune",
    "Ahmadnagar": "522_Ahmadnagar",
    "Beed": "523_Beed",
    "Latur": "524_Latur",
    "Osmanabad": "525_Osmanabad",
    "Solapur": "526_Solapur",
    "Satara": "527_Satara",
    "Ratnagiri": "528_Ratnagiri",
    "Sindhudurg": "529_Sindhudurg",
    "Kolhapur": "530_Kolhapur",
    "Sangali": "531_Sangali",
    "Palghar": "601_Palghar"
}


var categorical_variables = [
    "Govt.Secondary.School..Status.A.1..NA.2..",
    "Govt.Pre.Primary.School..Nursery.LKG.UKG...Status.A.1..NA.2..",
    "Nearest.Facility.Status..Govt.1..Private.2...3",
    "Private.Primary.School..Status.A.1..NA.2.."
    ,"District.Code"
    ,"Sub.District.Code"
    ,"CD.Block.Code"
    ,"Govt.Pre-Primary.School..Nursery.LKG.UKG...Status.A.1..NA.2.."
    ,"Private.Pre.-.Primary.School..Nursery.LKG.UKG...Status.A.1..NA.2.."
    ,"Govt.Primary.School..Status.A.1..NA.2.."
    ,"Private.Primary.School..Status.A.1..NA.2.."
    ,"Govt.Middle..School..Status.A.1..NA.2.."
    ,"Private.Middle..School..Status.A.1..NA.2.."
    ,"Govt.Secondary.School..Status.A.1..NA.2.."
    ,"Private.Secondary.School..Status.A.1..NA.2.."
    ,"Govt.Senior.Secondary.School..Status.A.1..NA.2.."
    ,"Private.Senior.Secondary.School..Status.A.1..NA.2.."
    ,"Govt..Arts.and.Science.Degree.College..Status.A.1..NA.2.."
    ,"Private..Arts.and.Science.Degree.College..Status.A.1..NA.2.."
    ,"Govt.Engineering.College..Status.A.1..NA.2.."
    ,"Private.Engineering.College..Status.A.1..NA.2.."
    ,"Govt.Medicine.College..Status.A.1..NA.2.."
    ,"Private.Medicine..College..Status.A.1..NA.2.."
    ,"Govt.Management.Institute..Status.A.1..NA.2.."
    ,"Private.Management.Institute..Status.A.1..NA.2.."
    ,"Govt.Polytechnic..Status.A.1..NA.2.."
    ,"Private.Polytechnic..Status.A.1..NA.2.."
    ,"Govt.Vocational.Training.School.ITI..Status.A.1..NA.2.."
    ,"Private.Vocational.Training.School.ITI..Status.A.1..NA.2.."
    ,"Government.Non.Formal.Training.Centre..Status.A.1..NA.2.."
    ,"Private.Non.Formal.Training.Centre..Status.A.1..NA.2.."
    ,"Government.School.For.Disabled..Status.A.1..NA.2.."
    ,"Private.School.For.Disabled...Status.A.1..NA.2.."
    ,"Government.Others..Status.A.1..NA.2.."
    ,"Private.Others..Status.A.1..NA.2.."
    ,"Tap.Water-Treated..Status.A.1..NA.2.."
    ,"Tap.Water-Treated.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Tap.Water-Treated.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Tap.Water.Untreated..Status.A.1..NA.2.."
    ,"Tap.Water.Untreated.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Tap.Water.Untreated.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Covered.Well..Status.A.1..NA.2.."
    ,"Covered.Well.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Covered.Well.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Uncovered..Well..Status.A.1..NA.2.."
    ,"Uncovered..Well.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Uncovered..Well.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Hand.Pump..Status.A.1..NA.2.."
    ,"Hand.Pump.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Hand.Pump.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Tube.Wells.Borehole..Status.A.1..NA.2.."
    ,"Tube.Wells.Borehole.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Tube.Wells.Borehole.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Spring..Status.A.1..NA.2.."
    ,"Spring.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Spring.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"River.Canal..Status.A.1..NA.2.."
    ,"River.Canal.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"River.Canal.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Tank.Pond.Lake..Status.A.1..NA.2.."
    ,"Tank.Pond.Lake.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Tank.Pond.Lake.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Others..Status.A.1..NA.2.."
    ,"Others.Functioning.All.round.the.year..Status.A.1..NA.2.."
    ,"Others.Functioning.in.Summer.months..April-September...Status.A.1..NA.2.."
    ,"Closed.Drainage..Status.A.1..NA.2.."
    ,"Open.Drainage..Status.A.1..NA.2.."
    ,"No..Drainage..Status.A.1..NA.2.."
    ,"Open.Pucca.Drainage.Covered.with.Tiles.Slabs..Status.A.1..NA.2.."
    ,"Open.Pucca.Drainage.Uncovered..Status.A.1..NA.2.."
    ,"Open.Kuccha.Drainage..Status.A.1..NA.2.."
    ,"Whether.Drain.water.is.discharged.directly.into.water.bodies.or.to.sewar.plant..For.Water.Bodies-1.Sewar.Plants-2."
    ,"Is.the.Area.Covered.under.Total.Sanitation.Campaign..TSC.?..Status.A.1..NA.2.."
    ,"Community.Toilet.Complex..including.Bath..for.General.Public..Status.A.1..NA.2.."
    ,"Community.Toilet.Complex..excluding.Bath..for.General.Public..Status.A.1..NA.2.."
    ,"Rural.Production.Centres.or.Sanitary.hardware.outlet.availability.near.the.village..Status.A.1..NA.2.."
    ,"Rural.Production.mart.or.Sanitary.hardware.outlet.availability.near.the.village..Status.A.1..NA.2.."
    ,"Community.waste.disposal.system.after.house.to.house.collection..Status.A.1..NA.2.."
    ,"Community.Bio-gas.or.recycle.of.waste.for.production.use..Status.A.1..NA.2.."
    ,"No.System..Garbage.on.road.street...Status.A.1..NA.2.."
    ,"Post.Office..Status.A.1..NA.2.."
    ,"Sub.Post.Office..Status.A.1..NA.2.."
    ,"Post.And.Telegraph.Office..Status.A.1..NA.2.."
    ,"Village.Pin.Code..Status.A.1..NA.2.."
    ,"Telephone..landlines...Status.A.1..NA.2.."
    ,"Public.Call.Office..Mobile..PCO...Status.A.1..NA.2.."
    ,"Mobile.Phone.Coverage..Status.A.1..NA.2.."
    ,"Internet.Cafes...Common.Service.Centre..CSC...Status.A.1..NA.2.."
    ,"Private.Courier.Facility..Status.A.1..NA.2.."
    ,"Public.Bus.Service..Status.A.1..NA.2.."
    ,"Private.Bus.Service..Status.A.1..NA.2.."
    ,"Railway.Station..Status.A.1..NA.2.."
    ,"Auto.Modified.Autos..Status.A.1..NA.2.."
    ,"Taxi...Status.A.1..NA.2.."
    ,"Vans..Status.A.1..NA.2.."
    ,"Tractors..Status.A.1..NA.2.."
    ,"Cycle-pulled.Rickshaws....manual.driven...Status.A.1..NA.2.."
    ,"Cycle-pulled.Rickshaws..machine.driven...Status.A.1..NA.2.."
    ,"Carts.Drivens.by.Animals..Status.A.1..NA.2.."
    ,"Sea.River.Ferry.Service..Status.A.1..NA.2.."
    ,"National.Highway..Status.A.1..NA.2.."
    ,"State.Highway..Status.A.1..NA.2.."
    ,"Major.District.Road..Status.A.1..NA.2.."
    ,"Other.District.Road..Status.A.1..NA.2.."
    ,"Black.Topped..pucca..Road..Status.A.1..NA.2.."
    ,"Gravel..kuchha..Roads..Status.A.1..NA.2.."
    ,"Water.Bounded.Macadam..Status.A.1..NA.2.."
    ,"All.Weather.Road..Status.A.1..NA.2.."
    ,"Navigable.Waterways..River.Canal...Status.A.1..NA.2.."
    ,"Foothpath..Status.A.1..NA.2.."
    ,"ATM..Status.A.1..NA.2.."
    ,"Commercial.Bank..Status.A.1..NA.2.."
    ,"Cooperative.Bank..Status.A.1..NA.2.."
    ,"Agricultural.Credit.Societies..Status.A.1..NA.2.."
    ,"Self.-.Help.Group..SHG...Status.A.1..NA.2.."
    ,"Public.Distribution.System..PDS..Shop..Status.A.1..NA.2.."
    ,"Mandis.Regular.Market..Status.A.1..NA.2.."
    ,"Weekly.Haat..Status.A.1..NA.2.."
    ,"Agricultural.Marketing.Society..Status.A.1..NA.2.."
    ,"Nutritional.Centres-ICDS..Status.A.1..NA.2.."
    ,"Nutritional.Centres-Anganwadi.Centre..Status.A.1..NA.2.."
    ,"Nutritional.Centres-Others..Status.A.1..NA.2.."
    ,"ASHA..Status.A.1..NA.2.."
    ,"Community.Centre.with.without.TV..Status.A.1..NA.2.."
    ,"Sports.Field..Status.A.1..NA.2.."
    ,"Sports.Club.Recreation.Centre..Status.A.1..NA.2.."
    ,"Cinema.Video.Hall..Status.A.1..NA.2.."
    ,"Public.Library..Status.A.1..NA.2.."
    ,"Public.Reading.Room..Status.A.1..NA.2.."
    ,"Daily.Newspaper.Supply..Status.A.1..NA.2.."
    ,"Assembly.Polling.Station..Status.A.1..NA.2.."
    ,"Birth.and.Death.Registration.Office..Status.A.1..NA.2.."
    ,"Power.Supply.For.Domestic.Use...Status.A.1..NA.2.."
    ,"Power.Supply.For.Agriculture.Use..Status.A.1..NA.2.."
    ,"Power.Supply.For.Commercial.Use..Status.A.1..NA.2.."
    ,"Power.Supply.For.All.Users..Status.A.1..NA.2.."
    ,"Agricultural.Commodities..First."
    ,"Manufacturers.Commodities..First."
    ,"Handicrafts.Commodities..First."
    ,"Agricultural.Commodities..Second."
    ,"Manufacturers.Commodities..Second."
    ,"Handicrafts.Commodities..Second."
    ,"Agricultural.Commodities..Third."
    ,"Manufacturers.Commodities..Third."
    ,"Handicrafts..Commodities..Third."
]


var census_grouped_variables =
{"Census Code":[{"name":"District Code"},{"name":"Sub District Code"},{"name":"Village Code"},{"name":"CD Block Code"}],"Census Name":[{"name":"District Name"},{"name":"Sub District Name"},{"name":"Village Name"},{"name":"CD Block Name"},{"name":"Sub District Head Quarter"},{"name":"Sub District Head Quarter (Dist in km)"},{"name":"District Head Quarter "},{"name":"District Head Quarter  (Dist in km)"},{"name":"Nearest Statutory Town "},{"name":"Nearest Statutory Town (Dist in km)"}],"Land Use":[{"name":"Total Geographical Area (in Hectares)"},{"name":"Forests (in Hectares)"},{"name":"Non-Agricultural Uses (in Hectares)"},{"name":"Barren & Un-cultivable Land (in Hectares)"},{"name":"Permanent Pastures/Grazing Land (in Hectares)"},{"name":"Land Under Misc Tree Crops etc. (in Hectares)"},{"name":"Culturable Waste Land (in Hectares)"},{"name":"Other Fallow Land (in Hectares)"},{"name":"Current Fallows (in Hectares)"},{"name":"Net Area Sown (in Hectares)"}],"Demographic":[{"name":"Total Households"},{"name":"Total Population"},{"name":"Total Male Population"},{"name":"Total Female Population"},{"name":"Total Scheduled Castes Population"},{"name":"Total Scheduled Castes  Male Population"},{"name":"Total Scheduled Castes  Female Population"},{"name":"Total Scheduled Tribes Population"},{"name":"Total Scheduled Tribes  Male Population"},{"name":"Total Scheduled Tribes  Female Population"}],"Edu-School":[{"name":"Govt Pre-Primary School (Nursery/LKG/UKG)"},{"name":"Govt  Pre - Primary School (Nursery/LKG/UKG) (Numbers)"},{"name":"Private Pre - Primary School (Nursery/LKG/UKG)"},{"name":"Private Pre - Primary School (Nursery/LKG/UKG) (Numbers)"},{"name":"Govt Primary School"},{"name":"Govt Primary School (Numbers)"},{"name":"Private Primary School"},{"name":"Private  Primary School (Numbers)"},{"name":"Govt Middle  School"},{"name":"Govt  Middle School (Numbers)"},{"name":"Private Middle  School"},{"name":"Private Middle School (Numbers)"},{"name":"Govt Secondary School"},{"name":"Govt  Secondary School (Numbers)"},{"name":"Private Secondary School"},{"name":"Private Secondary  School (Numbers)"},{"name":"Govt Senior Secondary School"},{"name":"Govt Senior Secondary School (Numbers)"},{"name":"Private Senior Secondary School"},{"name":"Private Senior Secondary  School (Numbers)"},{"name":"Government School For Disabled"},{"name":"Government School For Disabled (Numbers)"},{"name":"Private School For Disabled"},{"name":"Private School For Disabled (Numbers)"},{"name":"Government Others"},{"name":"Government Others (Numbers)"},{"name":"Private Others"},{"name":"Private Others (Numbers)"}],"Edu-College":[{"name":"Govt  Arts and Science Degree College"},{"name":"Govt  Arts and Science Degree College (Numbers)"},{"name":"Private  Arts and Science Degree College"},{"name":"Private  Arts and Science Degree College (Numbers)"},{"name":"Govt Engineering College"},{"name":"Govt Engineering College (Numbers)"},{"name":"Private Engineering College"},{"name":"Private Engineering College (Numbers)"},{"name":"Govt Medicine College"},{"name":"Govt Medicine  College (Numbers)"},{"name":"Private Medicine  College"},{"name":"Private Medicine College (Numbers)"},{"name":"Govt Management Institute"},{"name":"Govt Management Institute (Numbers)"},{"name":"Private Management Institute"},{"name":"Private Management Institute (Numbers)"},{"name":"Govt Polytechnic"},{"name":"Govt Polytechnic (Numbers)"},{"name":"Private Polytechnic"},{"name":"Private Polytechnic (Numbers)"},{"name":"Govt Vocational Training School/ITI"},{"name":"Govt Vocational Training School/ITI (Numbers)"},{"name":"Private Vocational Training School/ITI"},{"name":"Private Vocational Training School/ITI (Numbers)"},{"name":"Government Non Formal Training Centre"},{"name":"Government Non Formal Training Centre (Numbers)"},{"name":"Private Non Formal Training Centre"},{"name":"Private Non Formal Training Centre (Numbers)"}],"Health":[{"name":"Community Health Centre"},{"name":"Community Health Centre Doctors Total Strength"},{"name":"Community Health Centre Doctors In Position"},{"name":"Community Health Centre Para Medical  Staff Total Strength"},{"name":"Community Health Centre Para Medical Staff In Position"},{"name":"Primary Health Centre"},{"name":"Primary Health Centre  Doctors Total Strength"},{"name":"Primary Health  Centre Doctors In Position"},{"name":"Primary  Health Centre Para Medical  Staff Total Strength"},{"name":"Primary  Health Centre Para Medical Staff In Position"},{"name":"Primary Heallth Sub Centre"},{"name":"Primary Heallth Sub Centre Doctors Total Strength"},{"name":"Primary Heallth Sub Centre Doctors In Position"},{"name":"Primary Heallth Sub Centre Para Medical  Staff Total Strength"},{"name":"Primary Heallth Sub Centre Para Medical Staff In Position"},{"name":"Maternity And Child Welfare Centre"},{"name":"Maternity And Child Welfare Centre Doctors Total Strength"},{"name":"Maternity And Child Welfare Centre Doctors In Position"},{"name":"Maternity And Child Welfare Centre Para Medical  Staff Total Strength"},{"name":"Maternity And Child Welfare Centre Para Medical Staff In Position"},{"name":"TB Clinic"},{"name":"TB Clinic Doctors Total Strength"},{"name":"TB Clinic Doctors In Position"},{"name":"TB Clinic Para Medical Para Medical  Staff Total Strength"},{"name":"TB Clinic Para Medical Para Medical Staff In Position"},{"name":"Hospital Allopathic"},{"name":"Hospital Allopathic Doctors Total Strength"},{"name":"Hospital Allopathic Doctors In Position"},{"name":"Hospital Allopathic Para Medical  Staff Total Strength"},{"name":"Hospital Allopathic Para Medical Staff In Position"},{"name":"Hospiltal Alternative Medicine"},{"name":"Hospiltal Alternative Medicine Doctors Total Strength"},{"name":"Hospiltal Alternative Medicine Doctors In Position"},{"name":"Hospiltal Alternative Medicine Para Medical  Staff Total Strength"},{"name":"Hospiltal Alternative Medicine Para Medical Staff In Position"},{"name":"Dispensary"},{"name":"Dispensary Doctors Total Strength"},{"name":"Dispensary Doctors In Position"},{"name":"Dispensary Para Medical  Staff Total Strength"},{"name":"Dispensary Para Medical Staff In Position"},{"name":"Veterinary Hospital"},{"name":"Veterinary Hospital Doctors Total Strength"},{"name":"Veterinary Hospital Doctors In Position"},{"name":"Veterinary Hospital Para Medical  Staff Total Strength"},{"name":"Veterinary Hospital Para Medical Staff In Position"},{"name":"Mobile Health Clinic"},{"name":"Mobile Health Clinic Doctors Total Strength"},{"name":"Mobile Health Clinic Doctors In Position"},{"name":"Mobile Health Clinic Para Medical  Staff Total Strength"},{"name":"Mobile Health Clinic Para Medical Staff In Position(Numbers)"},{"name":"Family Welfare Centre"},{"name":"Family Welfare Centre Doctors Total Strength"},{"name":"Family Welfare Centre Doctors In Position"},{"name":"Family Welfare Centre Para Medical  Staff Total Strength"},{"name":"Family Welfare Centre Para Medical Staff In Position"},{"name":"Non Govt Med facilities Out Patient"},{"name":"Non Govt Med facilities In And Out Patient"},{"name":"Non Govt Med facilities Charitable"},{"name":"Non Govt Med facilities Medical Prctitioner with MBBS Degree"},{"name":"Non Govt Med facilities Medical Prctitioner with other Degree"},{"name":"Non Govt Med facilities Medical Practitioner with no  Degree"},{"name":"Non Govt Med facilities Traditional Practitioner and Faith  Healer"},{"name":"Non Govt Med facilities Medicine Shop"},{"name":"Non Govt Med facilities Others"},{"name":"ASHA"}],"Water":[{"name":"Tap Water-Treated"},{"name":"Tap Water-Treated (Functions all year)"},{"name":"Tap Water-Treated (Functions in Summer, Apr-Sep)"},{"name":"Tap Water Untreated"},{"name":"Tap Water Untreated (Functions all year)"},{"name":"Tap Water Untreated (Functions in Summer, Apr-Sep)"},{"name":"Covered Well"},{"name":"Covered Well (Functions all year)"},{"name":"Covered Well (Functions in Summer, Apr-Sep)"},{"name":"Uncovered  Well"},{"name":"Uncovered  Well (Functions all year)"},{"name":"Uncovered  Well (Functions in Summer, Apr-Sep)"},{"name":"Hand Pump"},{"name":"Hand Pump (Functions all year)"},{"name":"Hand Pump (Functions in Summer, Apr-Sep)"},{"name":"Tube Wells/Bore"},{"name":"Tube Wells/Bore (Functions all year)"},{"name":"Tube Wells/Bore (Functions in Summer, Apr-Sep)"},{"name":"Spring"},{"name":"Spring (Functions all year)"},{"name":"Spring (Functions in Summer, Apr-Sep)"},{"name":"River/Canal"},{"name":"River/Canal (Functions all year)"},{"name":"River/Canal (Functions in Summer, Apr-Sep)"},{"name":"Tank/Pond/Lake"},{"name":"Tank/Pond/Lake (Functions all year)"},{"name":"Tank/Pond/Lake (Functions in Summer, Apr-Sep)"},{"name":"Others"},{"name":"Others (Functions all year)"},{"name":"Others (Functions in Summer, Apr-Sep)"}],"Sanitation & Waste Mgmt":[{"name":"Closed Drainage"},{"name":"Open Drainage"},{"name":"No  Drainage"},{"name":"Open Pucca Drainage Covered with Tiles Slabs"},{"name":"Open Pucca Drainage Uncovered"},{"name":"Open Kuccha Drainage"},{"name":"Whether Drain water is discharged directly into water bodies or to sewar plant (For Water Bodies-1/Sewar Plants-2)"},{"name":"Is the Area Covered under Total Sanitation Campaign (TSC)?"},{"name":"Community Toilet Complex (including Bath) for General Public"},{"name":"Community Toilet Complex (excluding Bath) for General Public"},{"name":"Rural Production Centres or Sanitary hardware outlet availability near the village"},{"name":"Rural Production mart or Sanitary hardware outlet availability near the village"},{"name":"Community waste disposal system after house to house collection"},{"name":"Community Bio-gas or recycle of waste for production use"},{"name":"No System (Garbage on road/street)"}],"Communication":[{"name":"Post Office"},{"name":"Sub Post Office"},{"name":"Post And Telegraph Office"},{"name":"Village Pin Code"},{"name":"PIN Code"},{"name":"Telephone (landlines)"},{"name":"Public Call Office /Mobile (PCO)"},{"name":"Mobile Phone Coverage"},{"name":"Internet Cafes / Common Service Centre (CSC)"},{"name":"Private Courier Facility"}],"Transport":[{"name":"Public Bus Service"},{"name":"Private Bus Service"},{"name":"Railway Station"},{"name":"Auto/Modified Autos"},{"name":"Taxi "},{"name":"Vans"},{"name":"Tractors"},{"name":"Cycle-pulled Rickshaws   (manual driven)"},{"name":"Cycle-pulled Rickshaws (machine driven)"},{"name":"Carts Drivens by Animals"},{"name":"Sea/River/Ferry Service"},{"name":"National Highway"},{"name":"State Highway"},{"name":"Major District Road"},{"name":"Other District Road"},{"name":"Black Topped (pucca) Road"},{"name":"Gravel (kuchha) Roads"},{"name":"Water Bounded Macadam"},{"name":"All Weather Road"},{"name":"Navigable Waterways (River/Canal)"},{"name":"Foothpath"}],"Finance":[{"name":"ATM"},{"name":"Commercial Bank"},{"name":"Cooperative Bank"},{"name":"Agricultural Credit Societies"},{"name":"Self - Help Group (SHG)"}],"Nutrition":[{"name":"Public Distribution System (PDS) Shop"},{"name":"Nutritional Centres-ICDS"},{"name":"Nutritional Centres-Anganwadi Centre"},{"name":"Nutritional Centres-Others"}],"Agriculture":[{"name":"Mandis/Regular Market"},{"name":"Agricultural Marketing Society"},{"name":"Agricultural Commodities (First)"},{"name":"Agricultural Commodities (Second)"},{"name":"Agricultural Commodities (Third)"}],"Commerce":[{"name":"Weekly Haat"},{"name":"Manufacturers Commodities (First)"},{"name":"Handicrafts Commodities (First)"},{"name":"Manufacturers Commodities (Second)"},{"name":"Handicrafts Commodities (Second)"},{"name":"Manufacturers Commodities (Third)"},{"name":"Handicrafts  Commodities (Third)"}],"Other Facilities":[{"name":"Community Centre with/without TV"},{"name":"Sports Field"},{"name":"Sports Club/Recreation Centre"},{"name":"Cinema/Video Hall"},{"name":"Public Library"},{"name":"Public Reading Room"},{"name":"Daily Newspaper Supply"},{"name":"Assembly Polling Station"},{"name":"Birth and Death Registration Office"}],"Energy":[{"name":"Power Supply (Domestic)"},{"name":"Power Supply (Domestic) (Apr-Sep) (hrs/day)"},{"name":"Power Supply (Domestic) (Oct-Mar) (hrs/day)"},{"name":"Power Supply (Agriculture)"},{"name":"Power Supply (Agriculture) (Apr-Sep) (hrs/day)"},{"name":"Power Supply (Agriculture) (Oct-Mar) (hrs/day)"},{"name":"Power Supply (Commercial)"},{"name":"Power Supply (Commercial) (Apr-Sep) (hrs/day)"},{"name":"Power Supply (Commercial) (Oct-Mar) (hrs/day)"},{"name":"Power Supply All Users"},{"name":"Power Supply All Users (Apr-Sep) (hrs/day)"},{"name":"Power Supply All Users (Oct-Mar) (hrs/day)"}],"Irrigation":[{"name":"Total Unirrigated Land (in Hectares)"},{"name":"Total Irrigated Land (in Hectares)"},{"name":"by Canals (in Hectares)"},{"name":"by Wells/Tube Wells (in Hectares)"},{"name":"by Tanks/Lakes (in Hectares)"},{"name":"by Waterfall (in Hectares)"},{"name":"by Other Source (in Hectares)"}]};

var fields_short_long_map = {
  "District Code": "District.Code",
  "District Name": "District.Name",
  "Sub District Code": "Sub.District.Code",
  "Sub District Name": "Sub.District.Name",
  "Village Code": "Village.Code",
  "Village Name": "Village.Name",
  "CD Block Code": "CD.Block.Code",
  "CD Block Name": "CD.Block.Name",
  "Sub District Head Quarter": "Sub.District.Head.Quarter..Name.",
  "Sub District Head Quarter (Dist in km)": "Sub.District.Head.Quarter..Distance.in.km.",
  "District Head Quarter ": "District.Head.Quarter...Name.",
  "District Head Quarter  (Dist in km)": "District.Head.Quarter...Distance.in.km.",
  "Nearest Statutory Town ": "Nearest.Statutory.Town...Name.",
  "Nearest Statutory Town (Dist in km)": "Nearest.Statutory.Town..Distance.in.km.",
  "Total Geographical Area (in Hectares)": "Total.Geographical.Area..in.Hectares.",
  "Total Households": "Total...Households",
  "Total Population": "Total.Population.of.Village",
  "Total Male Population": "Total.Male.Population.of.Village",
  "Total Female Population": "Total.Female.Population.of.Village",
  "Total Scheduled Castes Population": "Total.Scheduled.Castes.Population.of.Village",
  "Total Scheduled Castes  Male Population": "Total.Scheduled.Castes..Male.Population.of.Village",
  "Total Scheduled Castes  Female Population": "Total.Scheduled.Castes..Female.Population.of.Village",
  "Total Scheduled Tribes Population": "Total.Scheduled.Tribes.Population.of.Village",
  "Total Scheduled Tribes  Male Population": "Total.Scheduled.Tribes..Male.Population.of.Village",
  "Total Scheduled Tribes  Female Population": "Total.Scheduled.Tribes..Female.Population.of.Village",
  "Govt Pre-Primary School (Nursery/LKG/UKG)": "Govt.Pre-Primary.School..Nursery.LKG.UKG...Status.A.1..NA.2..",
  "Govt  Pre - Primary School (Nursery/LKG/UKG) (Numbers)": "Govt..Pre.-.Primary.School..Nursery.LKG.UKG...Numbers.",
  "Private Pre - Primary School (Nursery/LKG/UKG)": "Private.Pre.-.Primary.School..Nursery.LKG.UKG...Status.A.1..NA.2..",
  "Private Pre - Primary School (Nursery/LKG/UKG) (Numbers)": "Private.Pre.-.Primary.School..Nursery.LKG.UKG...Numbers.",
  "Govt Primary School": "Govt.Primary.School..Status.A.1..NA.2..",
  "Govt Primary School (Numbers)": "Govt.Primary.School..Numbers.",
  "Private Primary School": "Private.Primary.School..Status.A.1..NA.2..",
  "Private  Primary School (Numbers)": "Private..Primary.School..Numbers.",
  "Govt Middle  School": "Govt.Middle..School..Status.A.1..NA.2..",
  "Govt  Middle School (Numbers)": "Govt..Middle.School..Numbers.",
  "Private Middle  School": "Private.Middle..School..Status.A.1..NA.2..",
  "Private Middle School (Numbers)": "Private.Middle.School..Numbers.",
  "Govt Secondary School": "Govt.Secondary.School..Status.A.1..NA.2..",
  "Govt  Secondary School (Numbers)": "Govt..Secondary.School..Numbers.",
  "Private Secondary School": "Private.Secondary.School..Status.A.1..NA.2..",
  "Private Secondary  School (Numbers)": "Private.Secondary..School..Numbers.",
  "Govt Senior Secondary School": "Govt.Senior.Secondary.School..Status.A.1..NA.2..",
  "Govt Senior Secondary School (Numbers)": "Govt.Senior.Secondary.School..Numbers.",
  "Private Senior Secondary School": "Private.Senior.Secondary.School..Status.A.1..NA.2..",
  "Private Senior Secondary  School (Numbers)": "Private.Senior.Secondary..School..Numbers.",
  "Govt  Arts and Science Degree College": "Govt..Arts.and.Science.Degree.College..Status.A.1..NA.2..",
  "Govt  Arts and Science Degree College (Numbers)": "Govt..Arts.and.Science.Degree.College..Numbers.",
  "Private  Arts and Science Degree College": "Private..Arts.and.Science.Degree.College..Status.A.1..NA.2..",
  "Private  Arts and Science Degree College (Numbers)": "Private..Arts.and.Science.Degree.College..Numbers.",
  "Govt Engineering College": "Govt.Engineering.College..Status.A.1..NA.2..",
  "Govt Engineering College (Numbers)": "Govt.Engineering.College..Numbers.",
  "Private Engineering College": "Private.Engineering.College..Status.A.1..NA.2..",
  "Private Engineering College (Numbers)": "Private.Engineering.College..Numbers.",
  "Govt Medicine College": "Govt.Medicine.College..Status.A.1..NA.2..",
  "Govt Medicine  College (Numbers)": "Govt.Medicine..College..Numbers.",
  "Private Medicine  College": "Private.Medicine..College..Status.A.1..NA.2..",
  "Private Medicine College (Numbers)": "Private.Medicine.College..Numbers.",
  "Govt Management Institute": "Govt.Management.Institute..Status.A.1..NA.2..",
  "Govt Management Institute (Numbers)": "Govt.Management.Institute..Numbers.",
  "Private Management Institute": "Private.Management.Institute..Status.A.1..NA.2..",
  "Private Management Institute (Numbers)": "Private.Management.Institute..Numbers.",
  "Govt Polytechnic": "Govt.Polytechnic..Status.A.1..NA.2..",
  "Govt Polytechnic (Numbers)": "Govt.Polytechnic..Numbers.",
  "Private Polytechnic": "Private.Polytechnic..Status.A.1..NA.2..",
  "Private Polytechnic (Numbers)": "Private.Polytechnic..Numbers.",
  "Govt Vocational Training School/ITI": "Govt.Vocational.Training.School.ITI..Status.A.1..NA.2..",
  "Govt Vocational Training School/ITI (Numbers)": "Govt.Vocational.Training.School.ITI..Numbers.",
  "Private Vocational Training School/ITI": "Private.Vocational.Training.School.ITI..Status.A.1..NA.2..",
  "Private Vocational Training School/ITI (Numbers)": "Private.Vocational.Training.School.ITI..Numbers.",
  "Government Non Formal Training Centre": "Government.Non.Formal.Training.Centre..Status.A.1..NA.2..",
  "Government Non Formal Training Centre (Numbers)": "Government.Non.Formal.Training.Centre..Numbers.",
  "Private Non Formal Training Centre": "Private.Non.Formal.Training.Centre..Status.A.1..NA.2..",
  "Private Non Formal Training Centre (Numbers)": "Private.Non.Formal.Training.Centre..Numbers.",
  "Government School For Disabled": "Government.School.For.Disabled..Status.A.1..NA.2..",
  "Government School For Disabled (Numbers)": "Government.School.For.Disabled..Numbers.",
  "Private School For Disabled": "Private.School.For.Disabled...Status.A.1..NA.2..",
  "Private School For Disabled (Numbers)": "Private.School.For.Disabled..Numbers.",
  "Government Others": "Government.Others..Status.A.1..NA.2..",
  "Government Others (Numbers)": "Government.Others..Numbers.",
  "Private Others": "Private.Others..Status.A.1..NA.2..",
  "Private Others (Numbers)": "Private.Others..Numbers.",
  "Community Health Centre": "Community.Health.Centre..Numbers.",
  "Community Health Centre Doctors Total Strength": "Community.Health.Centre.Doctors.Total.Strength..Numbers.",
  "Community Health Centre Doctors In Position": "Community.Health.Centre.Doctors.In.Position..Numbers.",
  "Community Health Centre Para Medical  Staff Total Strength": "Community.Health.Centre.Para.Medical..Staff.Total.Strength..Numbers.",
  "Community Health Centre Para Medical Staff In Position": "Community.Health.Centre.Para.Medical.Staff.In.Position..Numbers.",
  "Primary Health Centre": "Primary.Health.Centre..Numbers.",
  "Primary Health Centre  Doctors Total Strength": "Primary.Health.Centre..Doctors.Total.Strength..Numbers.",
  "Primary Health  Centre Doctors In Position": "Primary.Health..Centre.Doctors.In.Position..Numbers.",
  "Primary  Health Centre Para Medical  Staff Total Strength": "Primary..Health.Centre.Para.Medical..Staff.Total.Strength..Numbers.",
  "Primary  Health Centre Para Medical Staff In Position": "Primary..Health.Centre.Para.Medical.Staff.In.Position..Numbers.",
  "Primary Heallth Sub Centre": "Primary.Heallth.Sub.Centre..Numbers.",
  "Primary Heallth Sub Centre Doctors Total Strength": "Primary.Heallth.Sub.Centre.Doctors.Total.Strength..Numbers.",
  "Primary Heallth Sub Centre Doctors In Position": "Primary.Heallth.Sub.Centre.Doctors.In.Position..Numbers.",
  "Primary Heallth Sub Centre Para Medical  Staff Total Strength": "Primary.Heallth.Sub.Centre.Para.Medical..Staff.Total.Strength..Numbers.",
  "Primary Heallth Sub Centre Para Medical Staff In Position": "Primary.Heallth.Sub.Centre.Para.Medical.Staff.In.Position..Numbers.",
  "Maternity And Child Welfare Centre": "Maternity.And.Child.Welfare.Centre..Numbers.",
  "Maternity And Child Welfare Centre Doctors Total Strength": "Maternity.And.Child.Welfare.Centre.Doctors.Total.Strength..Numbers.",
  "Maternity And Child Welfare Centre Doctors In Position": "Maternity.And.Child.Welfare.Centre.Doctors.In.Position..Numbers.",
  "Maternity And Child Welfare Centre Para Medical  Staff Total Strength": "Maternity.And.Child.Welfare.Centre.Para.Medical..Staff.Total.Strength..Numbers.",
  "Maternity And Child Welfare Centre Para Medical Staff In Position": "Maternity.And.Child.Welfare.Centre.Para.Medical.Staff.In.Position..Numbers.",
  "TB Clinic": "TB.Clinic..Numbers.",
  "TB Clinic Doctors Total Strength": "TB.Clinic.Doctors.Total.Strength..Numbers.",
  "TB Clinic Doctors In Position": "TB.Clinic.Doctors.In.Position..Numbers.",
  "TB Clinic Para Medical Para Medical  Staff Total Strength": "TB.Clinic.Para.Medical.Para.Medical..Staff.Total.Strength..Numbers.",
  "TB Clinic Para Medical Para Medical Staff In Position": "TB.Clinic.Para.Medical.Para.Medical.Staff.In.Position..Numbers.",
  "Hospital Allopathic": "Hospital.Allopathic..Numbers.",
  "Hospital Allopathic Doctors Total Strength": "Hospital.Allopathic.Doctors.Total.Strength..Numbers.",
  "Hospital Allopathic Doctors In Position": "Hospital.Allopathic.Doctors.In.Position..Numbers.",
  "Hospital Allopathic Para Medical  Staff Total Strength": "Hospital.Allopathic.Para.Medical..Staff.Total.Strength..Numbers.",
  "Hospital Allopathic Para Medical Staff In Position": "Hospital.Allopathic.Para.Medical.Staff.In.Position..Numbers.",
  "Hospiltal Alternative Medicine": "Hospiltal.Alternative.Medicine..Numbers.",
  "Hospiltal Alternative Medicine Doctors Total Strength": "Hospiltal.Alternative.Medicine.Doctors.Total.Strength..Numbers.",
  "Hospiltal Alternative Medicine Doctors In Position": "Hospiltal.Alternative.Medicine.Doctors.In.Position..Numbers.",
  "Hospiltal Alternative Medicine Para Medical  Staff Total Strength": "Hospiltal.Alternative.Medicine.Para.Medical..Staff.Total.Strength..Numbers.",
  "Hospiltal Alternative Medicine Para Medical Staff In Position": "Hospiltal.Alternative.Medicine.Para.Medical.Staff.In.Position..Numbers.",
  "Dispensary": "Dispensary..Numbers.",
  "Dispensary Doctors Total Strength": "Dispensary.Doctors.Total.Strength..Numbers.",
  "Dispensary Doctors In Position": "Dispensary.Doctors.In.Position..Numbers.",
  "Dispensary Para Medical  Staff Total Strength": "Dispensary.Para.Medical..Staff.Total.Strength..Numbers.",
  "Dispensary Para Medical Staff In Position": "Dispensary.Para.Medical.Staff.In.Position..Numbers.",
  "Veterinary Hospital": "Veterinary.Hospital..Numbers.",
  "Veterinary Hospital Doctors Total Strength": "Veterinary.Hospital.Doctors.Total.Strength..Numbers.",
  "Veterinary Hospital Doctors In Position": "Veterinary.Hospital.Doctors.In.Position..Numbers.",
  "Veterinary Hospital Para Medical  Staff Total Strength": "Veterinary.Hospital.Para.Medical..Staff.Total.Strength..Numbers.",
  "Veterinary Hospital Para Medical Staff In Position": "Veterinary.Hospital.Para.Medical.Staff.In.Position..Numbers.",
  "Mobile Health Clinic": "Mobile.Health.Clinic..Numbers.",
  "Mobile Health Clinic Doctors Total Strength": "Mobile.Health.Clinic.Doctors.Total.Strength..Numbers.",
  "Mobile Health Clinic Doctors In Position": "Mobile.Health.Clinic.Doctors.In.Position..Numbers.",
  "Mobile Health Clinic Para Medical  Staff Total Strength": "Mobile.Health.Clinic.Para.Medical..Staff.Total.Strength..Numbers.",
  "Mobile Health Clinic Para Medical Staff In Position(Numbers)": "Mobile.Health.Clinic.Para.Medical.Staff.In.Position.Numbers.",
  "Family Welfare Centre": "Family.Welfare.Centre..Numbers.",
  "Family Welfare Centre Doctors Total Strength": "Family.Welfare.Centre.Doctors.Total.Strength..Numbers.",
  "Family Welfare Centre Doctors In Position": "Family.Welfare.Centre.Doctors.In.Position..Numbers.",
  "Family Welfare Centre Para Medical  Staff Total Strength": "Family.Welfare.Centre.Para.Medical..Staff.Total.Strength..Numbers.",
  "Family Welfare Centre Para Medical Staff In Position": "Family.Welfare.Centre.Para.Medical.Staff.In.Position..Numbers.",
  "Non Govt Med facilities Out Patient": "Non.Government.Medical.facilities.Out.Patient..Numbers.",
  "Non Govt Med facilities In And Out Patient": "Non.Government.Medical.facilities.In.And.Out.Patient..Numbers.",
  "Non Govt Med facilities Charitable": "Non.Government.Medical.facilities.Charitable..Numbers.",
  "Non Govt Med facilities Medical Prctitioner with MBBS Degree": "Non.Government.Medical.facilities.Medical.Prctitioner.with.MBBS.Degree..Numbers.",
  "Non Govt Med facilities Medical Prctitioner with other Degree": "Non.Government.Medical.facilities.Medical.Prctitioner.with.other.Degree..Numbers.",
  "Non Govt Med facilities Medical Practitioner with no  Degree": "Non.Government.Medical.facilities.Medical.Practitioner.with.no..Degree..Numbers.",
  "Non Govt Med facilities Traditional Practitioner and Faith  Healer": "Non.Government.Medical.facilities.Traditional.Practitioner.and.Faith..Healer..Numbers.",
  "Non Govt Med facilities Medicine Shop": "Non.Government.Medical.facilities.Medicine.Shop..Numbers.",
  "Non Govt Med facilities Others": "Non.Government.Medical.facilities.Others..Numbers.",
  "Tap Water-Treated": "Tap.Water-Treated..Status.A.1..NA.2..",
  "Tap Water-Treated (Functions all year)": "Tap.Water-Treated.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Tap Water-Treated (Functions in Summer, Apr-Sep)": "Tap.Water-Treated.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Tap Water Untreated": "Tap.Water.Untreated..Status.A.1..NA.2..",
  "Tap Water Untreated (Functions all year)": "Tap.Water.Untreated.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Tap Water Untreated (Functions in Summer, Apr-Sep)": "Tap.Water.Untreated.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Covered Well": "Covered.Well..Status.A.1..NA.2..",
  "Covered Well (Functions all year)": "Covered.Well.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Covered Well (Functions in Summer, Apr-Sep)": "Covered.Well.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Uncovered  Well": "Uncovered..Well..Status.A.1..NA.2..",
  "Uncovered  Well (Functions all year)": "Uncovered..Well.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Uncovered  Well (Functions in Summer, Apr-Sep)": "Uncovered..Well.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Hand Pump": "Hand.Pump..Status.A.1..NA.2..",
  "Hand Pump (Functions all year)": "Hand.Pump.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Hand Pump (Functions in Summer, Apr-Sep)": "Hand.Pump.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Tube Wells/Bore": "Tube.Wells.Borehole..Status.A.1..NA.2..",
  "Tube Wells/Bore (Functions all year)": "Tube.Wells.Borehole.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Tube Wells/Bore (Functions in Summer, Apr-Sep)": "Tube.Wells.Borehole.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Spring": "Spring..Status.A.1..NA.2..",
  "Spring (Functions all year)": "Spring.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Spring (Functions in Summer, Apr-Sep)": "Spring.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "River/Canal": "River.Canal..Status.A.1..NA.2..",
  "River/Canal (Functions all year)": "River.Canal.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "River/Canal (Functions in Summer, Apr-Sep)": "River.Canal.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Tank/Pond/Lake": "Tank.Pond.Lake..Status.A.1..NA.2..",
  "Tank/Pond/Lake (Functions all year)": "Tank.Pond.Lake.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Tank/Pond/Lake (Functions in Summer, Apr-Sep)": "Tank.Pond.Lake.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Others": "Others..Status.A.1..NA.2..",
  "Others (Functions all year)": "Others.Functioning.All.round.the.year..Status.A.1..NA.2..",
  "Others (Functions in Summer, Apr-Sep)": "Others.Functioning.in.Summer.months..April-September...Status.A.1..NA.2..",
  "Closed Drainage": "Closed.Drainage..Status.A.1..NA.2..",
  "Open Drainage": "Open.Drainage..Status.A.1..NA.2..",
  "No  Drainage": "No..Drainage..Status.A.1..NA.2..",
  "Open Pucca Drainage Covered with Tiles Slabs": "Open.Pucca.Drainage.Covered.with.Tiles.Slabs..Status.A.1..NA.2..",
  "Open Pucca Drainage Uncovered": "Open.Pucca.Drainage.Uncovered..Status.A.1..NA.2..",
  "Open Kuccha Drainage": "Open.Kuccha.Drainage..Status.A.1..NA.2..",
  "Whether Drain water is discharged directly into water bodies or to sewar plant (For Water Bodies-1/Sewar Plants-2)": "Whether.Drain.water.is.discharged.directly.into.water.bodies.or.to.sewar.plant..For.Water.Bodies-1.Sewar.Plants-2.",
  "Is the Area Covered under Total Sanitation Campaign (TSC)?": "Is.the.Area.Covered.under.Total.Sanitation.Campaign..TSC.?..Status.A.1..NA.2..",
  "Community Toilet Complex (including Bath) for General Public": "Community.Toilet.Complex..including.Bath..for.General.Public..Status.A.1..NA.2..",
  "Community Toilet Complex (excluding Bath) for General Public": "Community.Toilet.Complex..excluding.Bath..for.General.Public..Status.A.1..NA.2..",
  "Rural Production Centres or Sanitary hardware outlet availability near the village": "Rural.Production.Centres.or.Sanitary.hardware.outlet.availability.near.the.village..Status.A.1..NA.2..",
  "Rural Production mart or Sanitary hardware outlet availability near the village": "Rural.Production.mart.or.Sanitary.hardware.outlet.availability.near.the.village..Status.A.1..NA.2..",
  "Community waste disposal system after house to house collection": "Community.waste.disposal.system.after.house.to.house.collection..Status.A.1..NA.2..",
  "Community Bio-gas or recycle of waste for production use": "Community.Bio-gas.or.recycle.of.waste.for.production.use..Status.A.1..NA.2..",
  "No System (Garbage on road/street)": "No.System..Garbage.on.road.street...Status.A.1..NA.2..",
  "Post Office": "Post.Office..Status.A.1..NA.2..",
  "Sub Post Office": "Sub.Post.Office..Status.A.1..NA.2..",
  "Post And Telegraph Office": "Post.And.Telegraph.Office..Status.A.1..NA.2..",
  "Village Pin Code": "Village.Pin.Code..Status.A.1..NA.2..",
  "PIN Code": "PIN.Code",
  "Telephone (landlines)": "Telephone..landlines...Status.A.1..NA.2..",
  "Public Call Office /Mobile (PCO)": "Public.Call.Office..Mobile..PCO...Status.A.1..NA.2..",
  "Mobile Phone Coverage": "Mobile.Phone.Coverage..Status.A.1..NA.2..",
  "Internet Cafes / Common Service Centre (CSC)": "Internet.Cafes...Common.Service.Centre..CSC...Status.A.1..NA.2..",
  "Private Courier Facility": "Private.Courier.Facility..Status.A.1..NA.2..",
  "Public Bus Service": "Public.Bus.Service..Status.A.1..NA.2..",
  "Private Bus Service": "Private.Bus.Service..Status.A.1..NA.2..",
  "Railway Station": "Railway.Station..Status.A.1..NA.2..",
  "Auto/Modified Autos": "Auto.Modified.Autos..Status.A.1..NA.2..",
  "Taxi ": "Taxi...Status.A.1..NA.2..",
  "Vans": "Vans..Status.A.1..NA.2..",
  "Tractors": "Tractors..Status.A.1..NA.2..",
  "Cycle-pulled Rickshaws   (manual driven)": "Cycle-pulled.Rickshaws....manual.driven...Status.A.1..NA.2..",
  "Cycle-pulled Rickshaws (machine driven)": "Cycle-pulled.Rickshaws..machine.driven...Status.A.1..NA.2..",
  "Carts Drivens by Animals": "Carts.Drivens.by.Animals..Status.A.1..NA.2..",
  "Sea/River/Ferry Service": "Sea.River.Ferry.Service..Status.A.1..NA.2..",
  "National Highway": "National.Highway..Status.A.1..NA.2..",
  "State Highway": "State.Highway..Status.A.1..NA.2..",
  "Major District Road": "Major.District.Road..Status.A.1..NA.2..",
  "Other District Road": "Other.District.Road..Status.A.1..NA.2..",
  "Black Topped (pucca) Road": "Black.Topped..pucca..Road..Status.A.1..NA.2..",
  "Gravel (kuchha) Roads": "Gravel..kuchha..Roads..Status.A.1..NA.2..",
  "Water Bounded Macadam": "Water.Bounded.Macadam..Status.A.1..NA.2..",
  "All Weather Road": "All.Weather.Road..Status.A.1..NA.2..",
  "Navigable Waterways (River/Canal)": "Navigable.Waterways..River.Canal...Status.A.1..NA.2..",
  "Foothpath": "Foothpath..Status.A.1..NA.2..",
  "ATM": "ATM..Status.A.1..NA.2..",
  "Commercial Bank": "Commercial.Bank..Status.A.1..NA.2..",
  "Cooperative Bank": "Cooperative.Bank..Status.A.1..NA.2..",
  "Agricultural Credit Societies": "Agricultural.Credit.Societies..Status.A.1..NA.2..",
  "Self - Help Group (SHG)": "Self.-.Help.Group..SHG...Status.A.1..NA.2..",
  "Public Distribution System (PDS) Shop": "Public.Distribution.System..PDS..Shop..Status.A.1..NA.2..",
  "Mandis/Regular Market": "Mandis.Regular.Market..Status.A.1..NA.2..",
  "Weekly Haat": "Weekly.Haat..Status.A.1..NA.2..",
  "Agricultural Marketing Society": "Agricultural.Marketing.Society..Status.A.1..NA.2..",
  "Nutritional Centres-ICDS": "Nutritional.Centres-ICDS..Status.A.1..NA.2..",
  "Nutritional Centres-Anganwadi Centre": "Nutritional.Centres-Anganwadi.Centre..Status.A.1..NA.2..",
  "Nutritional Centres-Others": "Nutritional.Centres-Others..Status.A.1..NA.2..",
  "ASHA": "ASHA..Status.A.1..NA.2..",
  "Community Centre with/without TV": "Community.Centre.with.without.TV..Status.A.1..NA.2..",
  "Sports Field": "Sports.Field..Status.A.1..NA.2..",
  "Sports Club/Recreation Centre": "Sports.Club.Recreation.Centre..Status.A.1..NA.2..",
  "Cinema/Video Hall": "Cinema.Video.Hall..Status.A.1..NA.2..",
  "Public Library": "Public.Library..Status.A.1..NA.2..",
  "Public Reading Room": "Public.Reading.Room..Status.A.1..NA.2..",
  "Daily Newspaper Supply": "Daily.Newspaper.Supply..Status.A.1..NA.2..",
  "Assembly Polling Station": "Assembly.Polling.Station..Status.A.1..NA.2..",
  "Birth and Death Registration Office": "Birth.and.Death.Registration.Office..Status.A.1..NA.2..",
  "Power Supply (Domestic)": "Power.Supply.For.Domestic.Use...Status.A.1..NA.2..",
  "Power Supply (Domestic) (Apr-Sep) (hrs/day)": "Power.Supply.For.Domestic.Use.Summer..April-Sept...per.day..in.Hours.",
  "Power Supply (Domestic) (Oct-Mar) (hrs/day)": "Power.Supply.For.Domestic.Use.Winter..Oct.-March..per.day..in.Hours.",
  "Power Supply (Agriculture)": "Power.Supply.For.Agriculture.Use..Status.A.1..NA.2..",
  "Power Supply (Agriculture) (Apr-Sep) (hrs/day)": "Power.Supply.For.Agriculture.Use.Summer..April-Sept...per.day..in.Hours.",
  "Power Supply (Agriculture) (Oct-Mar) (hrs/day)": "Power.Supply.For.Agriculture.Use.Winter..Oct.-March.per.day..in.Hours.",
  "Power Supply (Commercial)": "Power.Supply.For.Commercial.Use..Status.A.1..NA.2..",
  "Power Supply (Commercial) (Apr-Sep) (hrs/day)": "Power.Supply.For.Commercial.Use.Summer..April-Sept...per.day..in.Hours.",
  "Power Supply (Commercial) (Oct-Mar) (hrs/day)": "Power.Supply.For.Commercial.Use.Winter..Oct.-March..per.day..in.Hours.",
  "Power Supply All Users": "Power.Supply.For.All.Users..Status.A.1..NA.2..",
  "Power Supply All Users (Apr-Sep) (hrs/day)": "Power.Supply.For.All.Users.Summer..April-Sept...per.day..in.Hours.",
  "Power Supply All Users (Oct-Mar) (hrs/day)": "Power.Supply.For.All.Users.Winter..Oct.-March..per.day..in.Hours.",
  "Agricultural Commodities (First)": "Agricultural.Commodities..First.",
  "Manufacturers Commodities (First)": "Manufacturers.Commodities..First.",
  "Handicrafts Commodities (First)": "Handicrafts.Commodities..First.",
  "Agricultural Commodities (Second)": "Agricultural.Commodities..Second.",
  "Manufacturers Commodities (Second)": "Manufacturers.Commodities..Second.",
  "Handicrafts Commodities (Second)": "Handicrafts.Commodities..Second.",
  "Agricultural Commodities (Third)": "Agricultural.Commodities..Third.",
  "Manufacturers Commodities (Third)": "Manufacturers.Commodities..Third.",
  "Handicrafts  Commodities (Third)": "Handicrafts..Commodities..Third.",
  "Forests (in Hectares)": "Forest.Area..in.Hectares.",
  "Non-Agricultural Uses (in Hectares)": "Area.under.Non-Agricultural.Uses..in.Hectares.",
  "Barren & Un-cultivable Land (in Hectares)": "Barren.&.Un-cultivable.Land.Area..in.Hectares.",
  "Permanent Pastures/Grazing Land (in Hectares)": "Permanent.Pastures.and.Other.Grazing.Land.Area..in.Hectares.",
  "Land Under Misc Tree Crops etc. (in Hectares)": "Land.Under.Miscellaneous.Tree.Crops.etc..Area..in.Hectares.",
  "Culturable Waste Land (in Hectares)": "Culturable.Waste.Land.Area..in.Hectares.",
  "Other Fallow Land (in Hectares)": "Fallows.Land.other.than.Current.Fallows.Area..in.Hectares.",
  "Current Fallows (in Hectares)": "Current.Fallows.Area..in.Hectares.",
  "Net Area Sown (in Hectares)": "Net.Area.Sown..in.Hectares.",
  "Total Unirrigated Land (in Hectares)": "Total.Unirrigated.Land.Area..in.Hectares.",
  "Total Irrigated Land (in Hectares)": "Area.Irrigated.by.Source..in.Hectares.",
  "by Canals (in Hectares)": "Canals.Area..in.Hectares.",
  "by Wells/Tube Wells (in Hectares)": "Wells.Tube.Wells.Area..in.Hectares.",
  "by Tanks/Lakes (in Hectares)": "Tanks.Lakes.Area..in.Hectares.",
  "by Waterfall (in Hectares)": "Waterfall.Area..in.Hectares.",
  "by Other Source (in Hectares)": "Other.Source..specify..Area..in.Hectares."
}