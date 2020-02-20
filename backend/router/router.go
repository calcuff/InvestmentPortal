package Router

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

// Dummy Quotes endpoint
func Quotes(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Getting Quotes!\n")
}
