
require(devtools)

install_github('rgrannell1/kea', ref = 'v0.55.0')
require(kea)


data_path <- xImplode_(.Platform $ file.sep, Sys.getenv() [['HOME']], 'polonium-gui/test/data/load_times.txt')

time_data_ <-
	x_(data_path) $ xRead() $ xToLines() $ xMap(xToWords) $
	xMap(row := {
		list( xFirstOf(row), as.numeric(xSecondOf(row)) )
	})




load_times <-
	time_data_                  $
	xChunk(2)                   $
	xMap(
		xMap(xSecondOf))        $
	xMap(
		xApply('-') %then% abs) $
	x_AsDouble()




summary(load_times)
