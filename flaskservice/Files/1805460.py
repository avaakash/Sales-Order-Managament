### TODO: A utility class which will be created by the user , with Class name as " _[your roll number]" ,
# TODO: all transformations should be written inside a function which will be called inside the predict method
import math
import pandas as pd

class _1805460():

    def __init__(self, map_cust_mean_delay, sorted_cpt, map_cust):
        self.map_cust_mean_delay = map_cust_mean_delay
        self.sorted_cpt = sorted_cpt
        self.map_cust = map_cust
    
    def cpt_to_class(self, x):
        idx = self.sorted_cpt.index(x)
        if idx < 0.33*len(self.sorted_cpt):
            return 1
        elif idx < 0.66*len(self.sorted_cpt):
            return 2
        return 3

    ## TODO: Please note that document id should be present till the getPredictions method
    def __tranformation1(self, data):
        data['salesOrderDate'] = pd.to_datetime(data['salesOrderDate'])
        data['dueDate'] = pd.to_datetime(data['dueDate'])

        data['create_month'] = data['salesOrderDate'].dt.month
        data['due_day'] = data['dueDate'].dt.day

        data['diff__due_date__create_date'] = (
            data['dueDate'] - data['salesOrderDate']).dt.days

        data['salesOrderAmount'] = data['salesOrderAmount'].apply(
            lambda x: math.log(x))
        return data

    def __transformation2(self, data):
        data['cust_number_clubbed'] = data['customerNumber'].apply(
            lambda x: x if x in self.map_cust else 'other')
        data['cust_mean_delay'] = data['cust_number_clubbed'].map(
            self.map_cust_mean_delay)

        data['business_code_CA02'] = data['businessCode'].apply(
            lambda x: 1 if x == 'CA02' else 0)
        data['business_code_U001'] = data['businessCode'].apply(
            lambda x: 1 if x == 'U001' else 0)
        data['business_code_other'] = data['businessCode'].apply(
            lambda x: 1 if x == 'other' else 0)
        data['business_code_U013'] = data['businessCode'].apply(
            lambda x: 1 if x == 'U013' else 0)

        data['custom_payment_terms_clubbed'] = data['customerNumber'].apply(
            lambda x: x if x in self.sorted_cpt else 'other')
        data['custom_payment_terms_class'] = data.custom_payment_terms_clubbed.apply(
            self.cpt_to_class)
        return data

    def ageing_bucket(self, x):
        if x <= 15:
            return 1
        elif 16 <= x <= 30:
            return 2
        elif 31 <= x <= 45:
            return 3
        elif 46 <= x <= 60:
            return 4
        else:
            return 5

    def getPredictions(self, data, model):
        data = self.__tranformation1(data)
        data = self.__transformation2(data)
        # your feature list, column names
        features = ['salesOrderAmount',
                    'create_month',
                    'due_day',
                    'diff__due_date__create_date',
                    'cust_mean_delay',
                    'business_code_CA02',
                    'business_code_U001',
                    'business_code_other',
                    'business_code_U013',
                    'custom_payment_terms_class']
                    
        print(data[features])
        # data should be a dataFrame and not a numpy array
        predictions = model.predict(data[features])
        data['predictions'] = predictions
        data['predictedAgeingBucket'] = data['predictions'].apply(lambda x: self.ageing_bucket(x))
        temp = data['predictions'].apply(lambda x: pd.Timedelta(x, unit='D'))
        data['predictedPaymentDate'] = data['dueDate'] + temp
        data['predictedPaymentDate'] = data['predictedPaymentDate'].dt.strftime('%d-%m-%Y')
        pred = data.loc[:, [
            'salesDocID', 'predictedAgeingBucket', 
            'predictedPaymentDate'
            ]].to_dict(orient="records")
        return pred
